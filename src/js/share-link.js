document.addEventListener("DOMContentLoaded", function () {
  const link = encodeURIComponent(window.location.href);
  const msg = encodeURIComponent(
    "Don't miss out on this epic adventure—click the share button and let the world in on the awesomeness! #MustReadBlog #PrepareToBeAmazed"
  );
  const title = encodeURIComponent(
    "🚀📚【独家爆料】你绝对不能错过的博客文章！让你的眼界瞬间翻转，知识涨停！🔥💡 快来一起探索这个引人入胜的世界吧！点击分享按钮，让更多人一同领略这篇魔幻之旅！✨🌍 #必读博客 #准备被惊艳到"
  );

  const twitter = document.querySelector(".twitter");
  twitter.href = `http://twitter.com/share?&url=${link}&text=${msg}`;

  const reddit = document.querySelector(".reddit");
  reddit.href = `http://www.reddit.com/submit?url=${link}&title=${title}`;

  const whatsapp = document.querySelector(".whatsapp");
  whatsapp.href = `https://api.whatsapp.com/send?text=${msg}%20${link}`;

  const telegram = document.querySelector(".telegram");
  telegram.href = `https://telegram.me/share/url?url=${link}&text=${msg}`;

  const weibo = document.querySelector(".weibo");
  weibo.href = `http://service.weibo.com/share/share.php?url=${link}&title=${title}`;
});
