(function () {
  var default_config = {
    origin_index: 0, // 初始显示的index
    animate_time: 500, // 动画执行时间
    item_space: 10, // item 之间的距离
    move_scope_rate: 1 / 6,
    pagination: true, // false | true || dom
    end_call_back: null // 移动完成执行函数 @para index
  };

  function zsySlider(dom, options) {
    var self = this;
    self.dom = {
      glr: dom
    };
    self.config = {}; // 储存游戏的配置
    self.tmp = {}; // 储存游戏中数据
    self.initConfig(options);
    self.init();
  }
  Laya.class(zsySlider, 'zsySlider');
  var _proto = zsySlider.prototype;

  // 初始化配置
  _proto.initConfig = function (options) {
    var self = this;
    if (!options) {
      options = {};
    }

    self.config.cur_index = options.origin_index || default_config.origin_index;
    self.config.item_space = options.item_space || default_config.item_space;
    self.config.animate_time = options.animate_time || default_config.animate_time;
    self.config.pagination = options.pagination || default_config.pagination;
    self.config.end_call_back = options.end_call_back || default_config.end_call_back;

    // 每次移动的距离
    if (options.item_width) {
      self.config.move_space = options.item_width + self.config.item_space;
      // 每次移动超过这个阈值 才会移动到上一个或者下一个, 不然只是移动到原来的位置
      self.config.move_scope = self.config.move_space * default_config.move_scope_rate;
    }
  };

  _proto.init = function () {
    var self = this;
    self.initDom();
    self.initEvent();

    // 如果option中没有设置item_width, 就根据当前的宽度计算 应该移动的位移
    if (!self.config.move_space) {
      self.config.move_space = self.dom.con.width + self.config.item_space;
      self.config.move_scope = self.config.move_space * default_config.move_scope_rate;
    }
  };

  _proto.initDom = function () {
    var self = this;
    var dom_glr = self.dom.glr;

    self.dom.con = dom_glr.getChildByName('con');
    self.dom.list = self.dom.con.getChildByName('list');
    self.replaceGlrList();
    self.addMask();

    self.dom.items = [];
    for (var i = 0; i < self.dom.list.numChildren; i++) {
      self.dom.items.push(self.dom.list.getChildAt(i));
    }

    if (self.config.pagination) {
      self.dom.pagination = dom_glr.getChildByName('pagination');
    }
  };

  // 在con上面添加mask
  _proto.addMask = function () {
    var self = this;
    var dom_con = self.dom.con;
    dom_con.scrollRect = new laya.maths.Rectangle(0, 0, dom_con.width, dom_con.height);

    // var mask_sprite = new laya.display.Sprite();
    // dom_con.mask = mask_sprite;
  };

  // 将原来ViewStact标签换成新的HBox
  _proto.replaceGlrList = function () {
    var self = this;
    var dom_con = self.dom.con;

    var dom_list = self.dom.list;
    var dom_new_list = new Laya.Box();

    dom_new_list.name = 'list';
    var arr_items = [];
    /*
      将list添加在数组中, 然后在添加到新的list中
      保证新的list中保持原有的顺序
    */
    for (var i = 0; i < dom_list.numChildren; i++) {
      var dom_item = dom_list.getChildAt(i);
      dom_item.name = 'item';
      dom_item.visible = true;
      arr_items.push(dom_item);
    }

    for (var i = 0; i < arr_items.length; i++) {
      if (i == default_config.origin_index) {
        arr_items[i].visible = true;
      } else {
        arr_items[i].visible = false;
      }
      dom_new_list.addChild(arr_items[i]);
    }
    self.dom.list = dom_new_list;
    dom_con.addChild(dom_new_list);
    dom_new_list.space = default_config.item_space;
    dom_new_list.cacheAs = 'none';
    dom_new_list.x = dom_list.x;
    dom_new_list.y = dom_list.y;

    // 删除原有的list
    dom_con.removeChild(dom_list);
    dom_list.destroy();

  };

  _proto.initEvent = function () {
    var self = this;
    var mouse_down = Laya.Event.MOUSE_DOWN;
    var mouse_move = Laya.Event.MOUSE_MOVE;
    var mouse_up = Laya.Event.MOUSE_UP;
    var dom_list = self.dom.list;

    if (self.config.pagination) {
      self.dom.pagination.selectHandler = Laya.Handler.create(self, self.paginationHandler, null, false);
    }

    dom_list.on(mouse_down, self, self.onTouchStart);
    dom_list.on(mouse_move, self, self.onTouchMove);
    Laya.stage.on(mouse_up, self, self.onTouchEnd);
  };

  // 点击paginationHandler的处理函数
  _proto.paginationHandler = function (index) {
    var self = this;
    var dom_pagination = self.dom.pagination;

    if (self.getTouchStatus() == 'onEndAnimate') {
      // 正在touchEnd动画时候不做处理
      return true;
    }
    // 如果用户点击pagination而不是滑动触发, 要移动list
    var cur_index = self.config.cur_index;
    var move_direction, next_show_index;
    next_show_index = index;
    if (cur_index > index) {
      move_direction = 'left';
    } else {
      move_direction = 'right';
    }
    self.handleMoveEffect(move_direction, next_show_index);
    self.animateMove();
  };

  // con 的 mouseDown
  _proto.onTouchStart = function (event) {
    var self = this;
    var dom_list = event.target;
    if (self.getTouchStatus() == 'onEndAnimate') {
      // 正在touchEnd动画时候不做处理
      return true;
    }
    self.tmp.start_point = {
      x: event.stageX,
      y: event.stageY
    };
    self.tmp.origin_pos = {
      x: dom_list.x
    };
    self.setTouchStatus('start');
  };

  // con 的 mouseMove
  _proto.onTouchMove = function (event) {
    var self = this;
    var dom_list = event.target;
    if (self.getTouchStatus() !== 'start' && self.getTouchStatus() !== 'move') {
      return true;
    }

    if (self.getTouchStatus() == 'start') {
      self.setTouchStatus('move');
    }
    self.tmp.move_dist = {
      x: event.stageX - self.tmp.start_point.x,
      y: event.stageY - self.tmp.start_point.y
    };
    dom_list.x = self.tmp.origin_pos.x + self.tmp.move_dist.x;
    self.detectNextShowIndex();
  };

  /*
    如果用户往前划, 将前面的item 显示到前面, 向后滑类式
    预估将要看到的item
  */
  _proto.detectNextShowIndex = function () {
    var self = this;
    var cur_index = self.config.cur_index;
    var dom_items = self.dom.items;
    var items_num = dom_items.length;
    var move_direction, next_show_index;
    var move_dist = self.tmp.move_dist.x;

    if (move_dist > 0) {
      move_direction = 'left';
    } else if (move_dist < 0) {
      move_direction = 'right';
    } else {
      // 没有移动不做处理
      self.tmp.next_show_index = cur_index;
      return true;
    }

    if (move_direction == 'left') {
      next_show_index = cur_index - 1;
    } else {
      next_show_index = cur_index + 1;
    }

    if (next_show_index < 0) {
      next_show_index = items_num - 1;
    } else if (next_show_index >= items_num) {
      next_show_index = 0;
    }
    self.handleMoveEffect(move_direction, next_show_index);
  };

  /*
    通过移动的方向, next_show_index, 将下一个显示的item 移动到相应的位置, 隐藏其他的
  */
  _proto.handleMoveEffect = function (move_direction, next_show_index) {
    var self = this;
    var cur_index = self.config.cur_index;
    var dom_items = self.dom.items;
    var move_space = self.config.move_space;
    if (move_direction == self.tmp.move_direction &&
      next_show_index == self.tmp.next_show_index) {
      // next_show_index 已经出现 无需处理
      return true;
    }
    self.tmp.move_direction = move_direction;
    self.tmp.next_show_index = next_show_index;

    for (var i = 0; i < dom_items.length; i++) {
      if (i == cur_index || i == next_show_index) {
        continue;
      }
      dom_items[i].x = 0;
      dom_items[i].visible = false;
    }

    var dom_next_show = dom_items[next_show_index];
    dom_next_show.visible = true;
    if (move_direction == 'left') {
      dom_next_show.x = -move_space;
    } else {
      dom_next_show.x = move_space;
    }
  };

  // con 的 mouseUp
  _proto.onTouchEnd = function (event) {
    var self = this;
    var move_dist = self.tmp && self.tmp.move_dist && self.tmp.move_dist.x;
    if (self.getTouchStatus() !== 'move') {
      return true;
    }
    if (!move_dist) {
      // 没有移动距离无需做任何操作
      return true;
    }

    var move_dist = self.tmp.move_dist.x;
    if (Math.abs(move_dist) < self.config.move_scope) {
      self.tmp.next_show_index = self.config.cur_index;
    }
    self.animateMove();
  };

  // 滑动结束 滚动最终的位置动画
  _proto.animateMove = function () {
    var self = this;
    var end_call_back = self.config.end_call_back;
    var next_show_index = self.tmp.next_show_index;
    var move_space = self.config.move_space;


    self.setTouchStatus('onEndAnimate');

    if (self.config.cur_index == next_show_index) {
      // 如果两者相等 移动的距离为0
      move_space = 0;
    } else {
      self.config.cur_index = next_show_index;
      if (self.tmp.move_direction == 'right') {
        move_space = -move_space;
      }
    }

    var dom_list = self.dom.list;
    var changeProper = {
      x: move_space
    };

    var Tween = new Laya.Tween();
    Tween.to(dom_list, changeProper, self.config.animate_time, null, Laya.Handler.create(self, callLater));

    function callLater() {
      if (self.config.pagination) {
        self.dom.pagination.selectedIndex = self.config.cur_index; // pagination的处理
      }
      if (end_call_back && typeof (end_call_back) == 'function') {
        end_call_back(self.config.cur_index);
      }
      self.reset();
    }
  };
  // 重置游戏
  _proto.reset = function () {
    var self = this;
    self.resetGlrCon();
    self.tmp = {};

    self.setTouchStatus('end');
  };

  // 滚动结束之后, reset所有的item
  _proto.resetGlrCon = function () {
    var self = this;
    var dom_list = self.dom.list;
    var dom_items = self.dom.items;
    var cur_index = self.config.cur_index;

    // 将list回到原点, 当前显示的item
    dom_list.x = 0;
    dom_items[cur_index].x = 0;

    for (var i = 0; i < dom_items.length; i++) {
      if (i != self.config.cur_index) {
        dom_items[i].visible = false;
        continue;
      }
      dom_items[i].x = 0; // 将节点的位置设置为0
    }
  };

  // 设置滚动的状态
  _proto.setTouchStatus = function (status) {
    var self = this;
    self.dom.con._zsySlider_touchtatus = status;
  };

  // 获取 滚动的状态
  _proto.getTouchStatus = function () {
    var self = this;
    return self.dom.con._zsySlider_touchtatus;
  };

})();