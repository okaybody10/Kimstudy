var dt = new FormData();
var st = new Set();
const mes = `안녕하세요! 먼저 문의주셔서 감사합니다 :-)
문의주신 내용 바탕으로 정보를 수집하고 있으나, 현재 등록되어 있는 프로필로 모든 것이 확인하기가 다소 힘듭니다. ㅠㅠ
따라서
1. 학생이 정확하게 원하는 과목의 범위( ex) 수1, 수2,...)
2. 현재 학생의 성취도(상, 중, 하 or 내신 N등급..)
2-1. 만약 내신이면 현재 재학중인 학교
를 작성해주시면 감사하겠습니다!`;
var truncateBefore = function (str, pattern) {
  return str.slice(str.indexOf(pattern) + pattern.length);
};

var chatlist = function () {
  return Array.from(document.getElementsByClassName("roomList")[0].children)
    .filter((number, index) => {
      return index % 2 == 0;
    })
    .slice(0, -1)
    .map((row) => row.getElementsByClassName("clickable")[0]);
};

dt.set("message", mes);

chatlist().forEach((row) => {
  var id = row.getAttribute("onclick").split("&")[0];
  st.add(truncateBefore(id, "id="));
});
console.log(st);

var inter = setInterval(() => {
  $("#chatList").load(window.location.href + " #chatList");
  var list = chatlist();
  list.forEach((row) => {
    var id = row.getAttribute("onclick").split("&")[0];
    id = truncateBefore(id, "id=");
    if (
      !st.has(id) &&
      Number(row.getElementsByClassName("unreadCount")[0].innerText)
    ) {
      st.add(id);
      dt.set("id", id);
      $.ajax({
        url: "https://kimstudy.com/chat/SetAgree",
        type: "POST",
        contentType: false,
        processData: false,
        conversationId: id,
      }).done(function (jso) {
        $.ajax({
          url: "https://kimstudy.com/chat/send",
          type: "POST",
          contentType: false,
          processData: false,
          data: dt,
        }).done(function (json) {
          console.log(json);
        });
      });
    }
  });
}, 1000 * 60);
