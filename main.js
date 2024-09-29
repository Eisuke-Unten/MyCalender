'use strict';

console.clear();

{
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();


  //カレンダーの頭のほうの日付を取得するという意味
  function getCalendarHead() {
    const dates = [];
    //今月の0日目とすれば、先月の末日のオブジェクトを求めることができます
    const d = new Date(year, month, 0).getDate();
    //今月の1日のオブジェクトが、週の何日目かを取得すればいいので,getDay() としてあげます。
    const n = new Date(year, month, 1).getDay();

    //その上で d から 1 日ずつさかのぼりつつ n 日分の日付が欲しいので、ループを回してあげましょう。
    for (let i = 0; i < n; i++) {
      //30
      //29, 30
      //28, 29, 30
      dates.unshift({
        date: d - i,
        isToday: false,  //先月分の日付なので当然 false 
        isDisabled: true,  //先月分の日付は薄くしたいので true にしておきます。
      });
    }

    return dates;
  }

  function getCalendarBody() {
    const dates = []; //date: 日付, day 曜日: 
    //末日は翌月 1 日の 1 日前という意味で、翌月の 0 日目を指定することで、今月の末日を取得することができる
    const lastDate = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= lastDate; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: false,
      });
    }

dates[today.getDate() - 1].isToday = true;

    return dates;
  }

  function getCalendarTail() {
    const dates = [];
    const lastDay = new Date(year, month + 1, 0).getDay();

    for (let i = 1; i < 7 - lastDay; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: true,
      });
    }

    return dates;
  }

  function clearCalendar() {
    const tbody = document.querySelector('tbody');

    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);  
    }
  }
  function renderTitle() {
    const title = `${year}/${String(month + 1).padStart(2, '0')}`;  
    document.getElementById('title').textContent = title;
  }


 

  function renderWeeks() {
    const dates = [
      
        //この中で、それぞれの関数を呼び出してあげればいい
        ...getCalendarHead(),
        ...getCalendarBody(),
        ...getCalendarTail(),
      ];
      const weeks = [];
      const weeksCount = dates.length / 7;
  
      for (let i = 0; i < weeksCount; i++) {
        //datesから7日分のデータを取るには、splice()を使って先頭から7個分を削除しつつ取り出してね、と書いてあげればいい
        weeks.push(dates.splice(0, 7));
      }
    
    weeks.forEach(week => {
      const tr = document.createElement('tr');
      week.forEach(date => {
        const td = document.createElement('td');

        td.textContent = date.date;  
        if (date.isToday) {
          td.classList.add('today');
        }
        if (date.isDisabled) {
          td.classList.add('disabled');
        }

        tr.appendChild(td);  
      });
      document.querySelector('tbody').appendChild(tr);
    });
  }

  function createCalendar() {
    clearCalendar();
    renderTitle();
    renderWeeks();
  }
    


  


document.getElementById('prev').addEventListener('click', () => {
  month--;  //month から 1 引いてカレンダーを描画すればいいのですが、単にこうするだけではダメで、年をまたいだら year のほうも操作してあげる必要があります。
  if (month < 0) {  //月は 0 から始まるので、注意しながら書いていきましょ
    year--;
    month = 11;
  }

  createCalendar();  //createCalender() でカレンダーを再描画してあげれば OK 
});

document.getElementById('next').addEventListener('click', () => {
  month++;
  if (month > 11) {
    year++;
    month = 0;
  }

  createCalendar();
});

createCalendar();
}
 