window.addEventListener('load', onLoadEvent);

var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 생성된 id를 추가 시켜 영상을 조작하기 위한 객체
var player = {};


function makeYoutube(id, link) {
  player[id] = new YT.Player(id, {
    height: '100%',
    width: '100%',
    playerVars: { autoplay: 1, controls: 0 },
    videoId: link,
    events: {
      onReady: onPlayerReady
    }
  });

  function onPlayerReady(event) {
    event.target.playVideo();
  }
}

/*
    조금이라도 첫 로딩을 빠르게 하기 위해
    .youtube를 클릭할 때 영상을 로드 시킴.
                                                     ↓
    makeRandomId() 함수를 추가한 이유는 new YT.Player(id,{})
    이 부분에는 id만 들어가기 떄문이다.

    그럼 처음 검색된 id에만 동영상이 로딩되고 다음 id엔 로드가 되지 않는다.
    그래서 생각한 것이 html에는 id를 넣지 않고 클릭될 때 id를 추가해서 넣고 그 아이디로 영상을 로드시키는 방법이다.
*/

function yotubeOnClick() {
  [].forEach.call(document.querySelectorAll('.youtube'), function(el, index) {
    el.addEventListener('click', function() {
      var thisYoutubeLink = this.getAttribute('data-youtubeLink');
      this.id = makeRandomId();
      makeYoutube(this.id, thisYoutubeLink);
      $('.thumb').addClass('on');
    });
  });

}

// load될 때 클릭 이벤트
function onLoadEvent() {
  yotubeOnClick();

}

// 위에 생성해둔 player 객체 안에 있는 프로퍼티들을 검색해서 비디오 멈춤
function youtubeAllStop() {
  for (var youtube in player) {
    player[youtube].pauseVideo();
  }
}

var makeRandomId = function() {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=-';

  for (var i = 0; i < 11; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};