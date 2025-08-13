let salesChart;

async function loadData() {
  try {
    const response = await fetch('data.json');  сюда позже можно поставить API
    const data = await response.json();

     Заполнение таблицы
    const tbody = document.querySelector('#salesTable tbody');
    tbody.innerHTML = '';  очищаем
    data.forEach(item = {
      const row = document.createElement('tr');
      row.innerHTML = `
        td${item.item}td
        td${item.price}td
        td${item.sold}td
        td${item.date}td
      `;
      tbody.appendChild(row);
    });

     Обновление графика
    const labels = data.map(d = d.item);
    const soldData = data.map(d = d.sold);

    const ctx = document.getElementById('salesChart').getContext('2d');

    if (salesChart) {
      salesChart.data.labels = labels;
      salesChart.data.datasets[0].data = soldData;
      salesChart.update();
    } else {
      salesChart = new Chart(ctx, {
        type 'bar',
        data {
          labels labels,
          datasets [{
            label 'Количество продаж',
            data soldData,
            backgroundColor 'rgba(54, 162, 235, 0.7)'
          }]
        },
        options {
          responsive true,
          plugins {
            legend { display false },
            title { display true, text 'Продажи предметов' }
          }
        }
      });
    }

  } catch (err) {
    console.error('Ошибка при загрузке данных', err);
  }
}

 Обновление каждые 5 минут (300000 мс)
setInterval(loadData, 300000);
loadData();
