document.addEventListener('DOMContentLoaded', function () {
  // 获取所有图片链接和模态背景
  var modalLinks = document.querySelectorAll('a[href^="#imgModal"]');
  var modalBackdrop = document.getElementById('backdrop');

  // 为每个链接添加打开模态的事件监听
  modalLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      // 显示背景遮罩层
      modalBackdrop.style.display = 'block';
      // 当背景遮罩层打开后，鼠标上下滚轮停止，
      modalBackdrop.addEventListener('mousewheel', function (event) {
        event.preventDefault();
      });
    });
  });

  // 处理关闭模态的情况
  function closeModal() {
    // 隐藏所有的模态
    document.querySelectorAll('.modal-img').forEach(function (modal) {
      // CSS中设置了:target选择器来显示模态，因此我们通过改变URL的哈希来“关闭”它们
      window.location.hash = '_';
    });

    // 隐藏背景遮罩层
    modalBackdrop.style.display = 'none';
  }

  // 为背景遮罩层添加关闭模态的事件监听
  modalBackdrop.addEventListener('click', function () {
    closeModal();
  });

  // 如果有关闭按钮，也可以为它们添加事件监听
  var closeButtons = document.querySelectorAll('.modal-close');
  closeButtons.forEach(function (button) {
    button.addEventListener('click', function (event) {
      // 防止链接打开URL
      event.preventDefault();
      closeModal();
    });
  });

  // （可选）处理按下ESC键关闭模态的情况
  window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  });
});
