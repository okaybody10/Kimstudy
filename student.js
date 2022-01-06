var dt = new FormData();
var t = ["��1", "��2", "��3", "n��"];
var st = new Set();
var pattern = "id=";
var truncateBefore = function (str, pattern) {
  return str.slice(str.indexOf(pattern) + pattern.length);
};
var comment = `�ȳ��Ͻʴϱ�?
�� ���� ������б��� ���� ���� �������̶�� �մϴ�.
���� �����ϰ� �� �Ұ����� �ϰڽ��ϴ�.
- �λ��ϰ��а���б� ��
- ������б� ��ǻ���а� �� (Ư��������)
- ������б� ���а� ��������, �� GPA 4.15 / 4.5

���� ���б� 3�г� ������ �������� ������ �����ؼ� ������� ���� �Ǿ����ϴ�.
���� ó���� �����ߴ� ���������� ������ ���� ���, �׸��� ���ݱ����� ������ �����帮���� ���� ��û���� ������ �Ǿ����ϴ�.

2019�� 9������ �����ϰ� ���ܸ� ���� �ؿ�����, ���� �л����� ���鼭 �׵��� �������� ã�� �ٷ������ �߽��ϴ�.
������ �ƴ� ���� ����� ������ �ֵ���, ������ ����ġ�� ���� ������ �̿� �������� �ʰ� �л����� ���� �����(���߷�)�� �ִ��� �̲������ �ϴ� ������ �����ؿԽ��ϴ�.
��� ���� ���� ��Ī�̶�� ���°� ���� �� �����ϴ�.

�ڼ��� ��� �� ���� ���� ����� �� �������� �������ֽø� �����ϰڽ��ϴ�.`;
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
