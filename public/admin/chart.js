var token=$("#token").val();
$.ajaxSetup({
  data: {
    'token': token
  }
});
$.ajax({
  type: "post",
  url: "http://127.0.0.1:3000/api/chart",
  data: {},
  dataType: "JSON",
  success: function (response) {
      if(response.check==true){
      var arr1=[];
      response.result[0].forEach(el => {
          var gt='';
          if(el["gender"]==0){
              gt='Nữ';
          }else{
              gt='Nam';
          }
          arr1.push([gt,el["total"]]);
      });
      // chart1(arr1);
      var arr2=[];
      var arr3=[];
      response.result[1].forEach(el => {
          var qty=parseInt(el['total']);
          arr2.push(el['name']);
          arr3.push(qty);
      
      });
      var pointer='#chart_div2';
      draw3(arr2,arr3,pointer,'Ty le luot xem san pham theo gioi tinh');
      arr2=[];
      arr3=[];
      response.result[2].forEach(el => {
          var qty=parseInt(el['total']);
          arr2.push(el['name']);
          arr3.push(qty);
      
      });
      draw3(arr2,arr3,'#chart_div3','Ty le luot xem san pham theo thuong hieu');
      
      arr2=[];
      arr3=[];
      response.result[4].forEach(el => {
        var total= parseInt(el['total']);
        arr2.push(el['date']);
        arr3.push(total);
      });
      // console.log(arr3);
      chart2(arr2,arr3);
      arr2=[];
      arr3=[];
      var totalBill= response.totalbill;
      response.result[5].forEach(el => {
        var stt='';
        var sl=0;
        if(el["status"]==0){
          stt='Đơn hủy';
        }else if(el["status"]==1){
          stt='Đơn đặt';
        }else if(el["status"]==2){
          stt='Đơn đang giao';
        }else if(el["status"]==3){
          stt='Đơn thành công';
        }
        arr2.push(stt);
        sl = parseInt(el["count"])*100/totalBill;
        arr3.push(sl);
      });
      console.log(arr2,arr3);
      chart1(arr3,arr2);
      var countProd='<a href="/products"><b>'+response.countProd+'</b></a>';
      var countCate='<a href="/cate"><b>'+response.countCate+'</b></a>';
      console.log(countProd);
      $("#resultProdCount").html(countProd);
      $("#resultCateCount").html(countCate);

      }

  }
});
    function chart2(x,y){
      var options = {
        series: [{
          name: "Desktops",
          data: y
      }],
        chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Doanh thu theo ngay',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis: {
        categories: x,
      }
      };

      var chart = new ApexCharts(document.querySelector("#chart_div4"), options);
      chart.render();
    }
    // ==================================================================
    function chart1(x,y){
        // // Load the Visualization API and the corechart package.
        // google.charts.load('current', {'packages':['corechart']});

        // // Set a callback to run when the Google Visualization API is loaded.
        // google.charts.setOnLoadCallback(drawChart);

        // // Callback that creates and populates a data table,
        // // instantiates the pie chart, passes in the data and
        // // draws it.
        // function drawChart() {

        //     // Create the data table.
        //     var data = new google.visualization.DataTable();
        //     data.addColumn('string', 'Giới tính');
        //     data.addColumn('number', 'Số lượng');
        //     data.addRows(arr);

        //     // Set chart options
        //     var options = {'title':'Số lượng sản phẩm theo giới tính',
        //                 'width':500,
        //                 'height':450};

        //     // Instantiate and draw our chart, passing in some options.
        //     var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        //     chart.draw(data, options);
        // }

        var options = {
          chart: {
            type: 'donut'
          },
          series: x,
          labels: y,
          
        }
        
        var chart = new ApexCharts(document.querySelector("#chart_div"), options);
        
        chart.render();
    }
    
    // ==========================================================

   function draw3(x,y,z,c){
    var arr1=x;
    var arr2=y;
    var pointer=z;
    var title=c;
    var options = {
        series: [{
        name: 'Inflation',
        data: arr2
      }],
        chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },
      
      xaxis: {
        categories: arr1,
        position: 'top',
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            }
          }
        },
        tooltip: {
          enabled: true,
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val + "%";
          }
        }
      
      },
      title: {
        text: title,
        floating: true,
        offsetY: 330,
        align: 'center',
        style: {
          color: '#444'
        }
      }
      };

      var chart = new ApexCharts(document.querySelector(pointer), options);
      chart.render();
   }
   loadBill()
   function loadBill(){
    $(".billdetail").click(function (e) {
      e.preventDefault();
      var idBill = $(this).attr("data-id");
      $(".billdetail").css("color", "black");
      $(this).css("color", "red");
      $.ajax({
          type: "post",
          url: "http://127.0.0.1:3000/api/billdetail",
          data: { id: idBill },
          dataType: "JSON",
          success: function (response) {
              if (response.check == true) {
                  var str = ``;
                  str += `
                  <table class="table">
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Hình ảnh</th>
                      <th scope="col">Tên sản phẩm</th>
                      <th scope="col">Số lượng tồn</th>
                      <th scope="col">Số lượng mua</th>
                      <th scope="col">Giá</th>
                    </tr>
                  </thead>
                  <tbody>
                  `;
                  var i = 1;
                  var total = 0;
                  response.result.forEach((el) => {
                      total +=
                          el["booked"] *
                          (el["price"] -
                              (el["price"] * el["discount"]) / 100);
                      str +=
                          `
                      <tr>
                          <td>` +
                          i++ +
                          `</td>
                          <td><img style="width:120px" src="` +
                          el["image"] +
                          `" alt=""></td>
                          <td><b>` +
                          el["productname"] +
                          `</b></td>
                          <td>` +
                          el["tonkho"] +
                          `</td>
                          <td>` +
                          el["booked"] +
                          `</td>
                          <td>` +
                          numeral(
                              el["booked"] *
                                  (el["price"] -
                                      (el["price"] * el["discount"]) / 100)
                          ).format("0,0") +
                          `</td>
                      </tr>
                      `;
                  });
                  str +=
                      `
                  <tr>
                      <td colspan="5"><h5>Tổng cộng: </h5></td>
                      <td><h5>` +
                      numeral(total).format("0,0") +
                      `</h5></td>
                  </tr>
                  </tbody>
                  </table>
                  `;
                  $("#resultSingleBillTK").html(str);
                  $("#BillDetailModal").modal('show');
                  $("#FinshBill").click(function (e) { 
                    e.preventDefault();
                    Swal.fire({
                      icon: "question",
                      text: "Đơn hàng đang giao hay hủy ?",
                      showDenyButton: true,
                      showCancelButton: true,
                      confirmButtonText: "Đang Giao",
                      denyButtonText: `Hủy`,
                  }).then((result) => {
                      /* Read more about isConfirmed, isDenied below */
                      if (result.isConfirmed) {
                          $.ajax({
                              type: "post",
                              url: "http://127.0.0.1:3000/api/updateSttBill",
                              data: { id: idBill, status: 2 },
                              dataType: "JSON",
                              success: function (response) {
                                  if (response.check == true) {
                                      const Toast = Swal.mixin({
                                          toast: true,
                                          position: "top-end",
                                          showConfirmButton: false,
                                          timer: 1500,
                                          timerProgressBar: true,
                                          didOpen: (toast) => {
                                              toast.addEventListener(
                                                  "mouseenter",
                                                  Swal.stopTimer
                                              );
                                              toast.addEventListener(
                                                  "mouseleave",
                                                  Swal.resumeTimer
                                              );
                                          },
                                      });
          
                                      Toast.fire({
                                          icon: "success",
                                          title: "Cập nhập đơn hàng thành công",
                                      }).then(() => {
                                          window.location.reload();
                                      });
                                  } else if (response.check == false) {
                                      if (response.message.id) {
                                          const Toast = Swal.mixin({
                                              toast: true,
                                              position: "top-end",
                                              showConfirmButton: false,
                                              timer: 3000,
                                              timerProgressBar: true,
                                              didOpen: (toast) => {
                                                  toast.addEventListener(
                                                      "mouseenter",
                                                      Swal.stopTimer
                                                  );
                                                  toast.addEventListener(
                                                      "mouseleave",
                                                      Swal.resumeTimer
                                                  );
                                              },
                                          });
          
                                          Toast.fire({
                                              icon: "error",
                                              title: response.message.id,
                                          });
                                      } else if (response.message) {
                                          const Toast = Swal.mixin({
                                              toast: true,
                                              position: "top-end",
                                              showConfirmButton: false,
                                              timer: 3000,
                                              timerProgressBar: true,
                                              didOpen: (toast) => {
                                                  toast.addEventListener(
                                                      "mouseenter",
                                                      Swal.stopTimer
                                                  );
                                                  toast.addEventListener(
                                                      "mouseleave",
                                                      Swal.resumeTimer
                                                  );
                                              },
                                          });
          
                                          Toast.fire({
                                              icon: "error",
                                              title: response.message,
                                          });
                                      }
                                  }
                              },
                          });
                      } else if (result.isDenied) {
                          $.ajax({
                              type: "post",
                              url: "http://127.0.0.1:3000/api/updateSttBill",
                              data: { id: idBill, status: 0 },
                              dataType: "JSON",
                              success: function (response) {
                                  if (response.check == true) {
                                      const Toast = Swal.mixin({
                                          toast: true,
                                          position: "top-end",
                                          showConfirmButton: false,
                                          timer: 1500,
                                          timerProgressBar: true,
                                          didOpen: (toast) => {
                                              toast.addEventListener(
                                                  "mouseenter",
                                                  Swal.stopTimer
                                              );
                                              toast.addEventListener(
                                                  "mouseleave",
                                                  Swal.resumeTimer
                                              );
                                          },
                                      });
          
                                      Toast.fire({
                                          icon: "success",
                                          title: "Cập nhập đơn hàng thành công",
                                      }).then(() => {
                                          window.location.reload();
                                      });
                                  } else if (response.check == false) {
                                      if (response.message.id) {
                                          const Toast = Swal.mixin({
                                              toast: true,
                                              position: "top-end",
                                              showConfirmButton: false,
                                              timer: 3000,
                                              timerProgressBar: true,
                                              didOpen: (toast) => {
                                                  toast.addEventListener(
                                                      "mouseenter",
                                                      Swal.stopTimer
                                                  );
                                                  toast.addEventListener(
                                                      "mouseleave",
                                                      Swal.resumeTimer
                                                  );
                                              },
                                          });
          
                                          Toast.fire({
                                              icon: "error",
                                              title: response.message.id,
                                          });
                                      } else if (response.message) {
                                          const Toast = Swal.mixin({
                                              toast: true,
                                              position: "top-end",
                                              showConfirmButton: false,
                                              timer: 3000,
                                              timerProgressBar: true,
                                              didOpen: (toast) => {
                                                  toast.addEventListener(
                                                      "mouseenter",
                                                      Swal.stopTimer
                                                  );
                                                  toast.addEventListener(
                                                      "mouseleave",
                                                      Swal.resumeTimer
                                                  );
                                              },
                                          });
          
                                          Toast.fire({
                                              icon: "error",
                                              title: response.message,
                                          });
                                      }
                                  }
                              },
                          });
                      }
                  });
              });
            }
          }
      });
  });
   }