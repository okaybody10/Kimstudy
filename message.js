var dt = new FormData();
var st = new Set();
const mes = `�ȳ��ϼ���! ���� �����ּż� �����մϴ� :-)
�����ֽ� ���� �������� ������ �����ϰ� ������, ���� ��ϵǾ� �ִ� �����ʷ� ��� ���� Ȯ���ϱⰡ �ټ� ����ϴ�. �Ф�
����
1. �л��� ��Ȯ�ϰ� ���ϴ� ������ ����( ex) ��1, ��2,...)
2. ���� �л��� ���뵵(��, ��, �� or ���� N���..)
2-1. ���� �����̸� ���� �������� �б�
�� �ۼ����ֽø� �����ϰڽ��ϴ�!`;
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
