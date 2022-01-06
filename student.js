var dt = new FormData();
var t = ["��1", "��2", "��3", "n��"];
var st = new Set();
var pattern = "id=";
var truncateBefore = function (str, pattern) {
  return str.slice(str.indexOf(pattern) + pattern.length);
};
var comment = `안녕하십니까?
전 현재 고려대학교에 재학 중인 성재혁이라고 합니다.
먼저 간략하게 제 소개부터 하겠습니다.
- 부산일과학고등학교 졸
- 고려대학교 컴퓨터학과 합 (특기자전형)
- 고려대학교 수학과 이중전공, 총 GPA 4.15 / 4.5

저도 중학교 3학년 때부터 독학으로 수학을 시작해서 여기까지 오게 되었습니다.
제가 처음에 생각했던 마음가짐과 공부할 때의 방법, 그리고 지금까지의 경험을 전수드리고자 과외 신청서를 보내게 되었습니다.

2019년 9월부터 꾸준하게 과외를 진행 해왔으며, 많은 학생들을 보면서 그들의 문제점을 찾고 바로잡고자 했습니다.
나무가 아닌 숲을 보라는 옛말이 있듯이, 수학을 가르치기 위해 갔지만 이에 국한하지 않고 학생들이 가진 잠재력(집중력)을 최대한 이끌어내고자 하는 수업을 진행해왔습니다.
어떻게 보면 공부 코칭이라고 보는게 맞을 것 같습니다.

자세한 약력 및 저의 과외 방식은 제 프로필을 참고해주시면 감사하겠습니다.`;
dt.set("comment", comment);
dt.set("tuteeId", "");
var count = 0;
var interv = setInterval(() => {
  $("#tutee_list").load(window.location.href + " #tutee_list");
  console.log(count);
  var tutee = Array.from(
    document.getElementsByClassName("row d-bg-main-gray m-padding-top-sm")[0]
      .children[0].children
  );
  tutee.forEach((row) => {
    if (
      t.some((i) =>
        row.getElementsByClassName("row")[5].innerText.includes(i)
      ) &&
      !st.has(row.getAttribute("href"))
    ) {
      st.add(row.getAttribute("href"));
      console.log(row.getElementsByClassName("row")[5].innerText);
      dt.set("tuteeId", truncateBefore(row.getAttribute("href"), pattern));
      $.ajax({
        url: "https://kimstudy.com/tutee/application",
        type: "POST",
        contentType: false,
        processData: false,
        data: dt,
      }).done(function (json) {
        console.log(json);
      });
    }
  });
}, 1000 * 60);
