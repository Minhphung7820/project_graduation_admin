var token=$("#token").val();
$("#tab-1").css("display", "block");
$("#tab-2").css("display", "none");
$("#tab-3").css("display", "none");
$(document).ready(function () {
    $.ajaxSetup({
        data: {
          'token': token
        }
    });

    addProduct();
    loadEditProd();
    loaddeleteImage();
    editProd();   
    editStorage();
    switchProduct();
    deleteProduct();
    loadDeleteProduct();
    editSingleProductInput();
    switchHighLight();
  });
function switchHighLight(){
  $(".switchHighLightProdBtn").click(function (e) { 
    e.preventDefault();
    var id = $(this).attr('data-id');
    $.ajax({
      type: "post",
      url: "http://127.0.0.1:3000/api/switchHighlightProduct",
      data: {id:id},
      dataType: "JSON",
      success: function (response) {
        if(response.check==true){
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Đã chuyển thành công'
          }).then(()=>{
            window.location.reload();
          })
        }else if(response.check==false){
            if(response.message.id){
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'error',
                title: response.message.id
              })
            }else if(response.message){
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'error',
                title: response.message
              })
            }
        }
      }
    });
  });
}

// ========================================================

  function switchGender(x,y){
    // x: idSP;y:Gender
    var gender = y;
    var id=x;
    if(gender==0){
        Swal.fire({
          icon:'question',
          text: 'Bạn muốn thay đổi giới tính cho sản phẩm?',
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: 'Đúng',
          denyButtonText: `Không`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            $.ajax({
              type: "post",
              url: "http://127.0.0.1:3000/api/switchProductGender",
              data: {
                    gender:1,
                    id:id                  
              },
              dataType: "JSON",
              success: function (response) {
                if(response.check==true){
                    const Toast = Swal.mixin({
                          toast: true,
                          position: 'top-end',
                          showConfirmButton: false,
                          timer: 3000,
                          timerProgressBar: true,
                          didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                          }
                        })
                        
                        Toast.fire({
                          icon: 'success',
                          title: 'Thay đổi thành công'
                        }).then(()=>{
                            window.location.reload();
                        })
                }else{
                    if(response.message.id){
                    const Toast = Swal.mixin({
                          toast: true,
                          position: 'top-end',
                          showConfirmButton: false,
                          timer: 3000,
                          timerProgressBar: true,
                          didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                          }
                        })
                        
                        Toast.fire({
                          icon: 'error',
                          title: response.message.id
                        })  
                    }else if(response.message.gender){
                        const Toast = Swal.mixin({
                          toast: true,
                          position: 'top-end',
                          showConfirmButton: false,
                          timer: 3000,
                          timerProgressBar: true,
                          didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                          }
                        })
                        
                        Toast.fire({
                          icon: 'error',
                          title: response.message.gender
                        })  
                    }else if(response.message){
                        const Toast = Swal.mixin({
                          toast: true,
                          position: 'top-end',
                          showConfirmButton: false,
                          timer: 3000,
                          timerProgressBar: true,
                          didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                          }
                        })
                        
                        Toast.fire({
                          icon: 'error',
                          title: response.message
                        })  
                    }
                }
              }
            });
          } else if (result.isDenied) {
            
          }
        })
    }else{
         Swal.fire({
          icon:'question',
          text: 'Bạn muốn thay đổi giới tính cho sản phẩm?',
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: 'Đúng',
          denyButtonText: `Không`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            $.ajax({
              type: "post",
              url: "http://127.0.0.1:3000/api/switchProductGender",
              data: {
                    gender:0,
                    id:id                  
              },
              dataType: "JSON",
              success: function (response) {
                if(response.check==true){
                    const Toast = Swal.mixin({
                          toast: true,
                          position: 'top-end',
                          showConfirmButton: false,
                          timer: 3000,
                          timerProgressBar: true,
                          didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                          }
                        })
                        
                        Toast.fire({
                          icon: 'success',
                          title: 'Thay đổi thành công'
                        }).then(()=>{
                            window.location.reload();
                        })
                }else{
                    if(response.message.id){
                    const Toast = Swal.mixin({
                          toast: true,
                          position: 'top-end',
                          showConfirmButton: false,
                          timer: 3000,
                          timerProgressBar: true,
                          didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                          }
                        })
                        
                        Toast.fire({
                          icon: 'error',
                          title: response.message.id
                        })  
                    }else if(response.message.gender){
                        const Toast = Swal.mixin({
                          toast: true,
                          position: 'top-end',
                          showConfirmButton: false,
                          timer: 3000,
                          timerProgressBar: true,
                          didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                          }
                        })
                        
                        Toast.fire({
                          icon: 'error',
                          title: response.message.gender
                        })  
                    }else if(response.message){
                        const Toast = Swal.mixin({
                          toast: true,
                          position: 'top-end',
                          showConfirmButton: false,
                          timer: 3000,
                          timerProgressBar: true,
                          didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                          }
                        })
                        
                        Toast.fire({
                          icon: 'error',
                          title: response.message
                        })  
                    }
                }
              }
            });
          } else if (result.isDenied) {
            
          }
        })
    }
}


// ==================================

function editSingleProductInput(){
  var idProd='';
  var newname='';
  $('.productNamerename').click(function (e) { 
    e.preventDefault();
    idProd=$(this).attr('data-id');
    var oldname = $(this).text().trim();
    var str=`
      <input type="text" placeholder="Tên sản phẩm mới" id="newProductName" value="`+oldname+`" class="form-control">
    `;
    $("#replacearea").html(str);
    $("#replaceModal").modal('show');
    $('#newProductName').keyup(function (e) { 
      newname = $("#newProductName").val().trim();
      if(e.which===13){
        if(newname==''){
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'error',
            title: 'Thiếu tên sản phẩm'
          })
        }else{
          var slug =  ChangeToSlug(newname);
          $.ajax({
            type: "post",
            url: "http://127.0.0.1:3000/api/updateproductName",
            data: {
                id:idProd,
                slug:slug,
                name:newname
            },
            dataType: "JSON",
            success: function (response) {
              if(response.check==true){
                const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                  }
                })
                
                Toast.fire({
                  icon: 'success',
                  title: 'Thay đổi thành công'
                }).then(()=>{
                  idProd='';
                  window.location.reload();
                })
              }else{
                if(response.message.id){
                  const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'error',
                    title: response.message.id
                  })
                }else if(response.message.slug){
                  const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'error',
                    title: response.message.slug
                  })
                }else if(response.message.name){
                  const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'error',
                    title: response.message.name
                  })
                }else if(response.message){
                  const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'error',
                    title: response.message
                  })
                }
              }
            }
          });
        }
      }

    });
    $('#submiteditSingle').click(function (e) { 
      e.preventDefault();
      if(newname==''){
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'error',
          title: 'Thiếu tên sản phẩm'
        })
      }else{
        var slug =  ChangeToSlug(newname);
        $.ajax({
          type: "post",
          url: "http://127.0.0.1:3000/api/updateproductName",
          data: {
              id:idProd,
              slug:slug,
              name:newname
          },
          dataType: "JSON",
          success: function (response) {
            if(response.check==true){
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'success',
                title: 'Thay đổi thành công'
              }).then(()=>{
                idProd=''
                window.location.reload();
              })
            }else{
              if(response.message.id){
                const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                  }
                })
                
                Toast.fire({
                  icon: 'error',
                  title: response.message.id
                })
              }else if(response.message.slug){
                const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                  }
                })
                
                Toast.fire({
                  icon: 'error',
                  title: response.message.slug
                })
              }else if(response.message.name){
                const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                  }
                })
                
                Toast.fire({
                  icon: 'error',
                  title: response.message.name
                })
              }else if(response.message){
                const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                  }
                })
                
                Toast.fire({
                  icon: 'error',
                  title: response.message
                })
              }
            }
          }
        });
      }
    });
  });
    // ==========================================
  $('.priceEdit').click(function (e) { 
    e.preventDefault();
    idProd=$(this).attr('data-id');
    var price= $(this).text();
    var str=`
    <input type="number" placeholder="Giá sản phẩm" id="newProductPrice" class="form-control">
    `;
    $("#replacearea").html(str);
    $("#replaceModal").modal('show');
    $('#newProductPrice').keyup(function (e) { 
      var newPrice=$("#newProductPrice").val().trim();
      if(e.which===13){
        if(newPrice==''||newPrice==0){
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'error',
            title: 'Đơn giá sản phẩm phải >0'
          })
        }else{
          $.ajax({
            type: "post",
            url: "http://127.0.0.1:3000/api/updateProductPrice",
            data: {
                id:idProd,
                price:newPrice,
            },
            dataType: "JSON",
            success: function (response) {
              if(response.check==true){
                const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                  }
                })
                
                Toast.fire({
                  icon: 'success',
                  title: 'Thay đổi thành công'
                }).then(()=>{
                  idProd='';
                  window.location.reload();
                })
              }else{
                if(response.message.id){
                  const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'error',
                    title: response.message.id
                  })
                }else if(response.message.price){
                  const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'error',
                    title: response.message.price
                  })
                }
                else if(response.message){
                  const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'error',
                    title: response.message
                  })
                }
              }
            }
          });
        }
      }
    });
    $('#submiteditSingle').click(function (e) { 
      e.preventDefault();
      var newPrice=$("#newProductPrice").val().trim();
      if(newPrice==''||newPrice==0){
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'error',
          title: 'Đơn giá sản phẩm phải >0'
        })
      }else{
        $.ajax({
          type: "post",
          url: "http://127.0.0.1:3000/api/updateProductPrice",
          data: {
              id:idProd,
              price:newPrice,
          },
          dataType: "JSON",
          success: function (response) {
            if(response.check==true){
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'success',
                title: 'Thay đổi thành công'
              }).then(()=>{
                idProd='';
                window.location.reload();
              })
            }else{
              if(response.message.id){
                const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                  }
                })
                
                Toast.fire({
                  icon: 'error',
                  title: response.message.id
                })
              }else if(response.message.price){
                const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                  }
                })
                
                Toast.fire({
                  icon: 'error',
                  title: response.message.price
                })
              }
              else if(response.message){
                const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                  }
                })
                
                Toast.fire({
                  icon: 'error',
                  title: response.message
                })
              }
            }
          }
        });
      }
    });
  });
  // ==========================================
  $('.discountEdit').click(function (e) { 
    e.preventDefault();
    idProd=$(this).attr('data-id');
    discount='';
    var str=`
    <div class="row">
      <div class="col">
      <input type="number" placeholder="Giảm giá sản phẩm" id="newProductDiscount" class="form-control">
      </div>
    </div>
    `;
    $("#replacearea").html(str);
    $("#replaceModal").modal('show');
    $('#newProductDiscount').keyup(function (e) { 
      discount=$("#newProductDiscount").val().trim();
      if(e.which===13){
        if(discount==''||discount<0){
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'error',
            title: 'Giảm giá sản phẩm phải ít nhất là 0'
          })
        }else{
          $.ajax({
            type: "post",
            url: "http://127.0.0.1:3000/api/updateProductDiscount",
            data: {
                id:idProd,
                discount:discount,
            },
            dataType: "JSON",
            success: function (response) {
              if(response.check==true){
                const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                  }
                })
                
                Toast.fire({
                  icon: 'success',
                  title: 'Thay đổi thành công'
                }).then(()=>{
                  idProd='';
                  window.location.reload();
                })
              }else{
                if(response.message.id){
                  const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'error',
                    title: response.message.id
                  })
                }else if(response.message.discount){
                  const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'error',
                    title: response.message.discount
                  })
                }
                else if(response.message){
                  const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'error',
                    title: response.message
                  })
                }
              }
            }
          });
        }
      }

    });
    $('#submiteditSingle').click(function (e) { 
      e.preventDefault();
      discount=$("#newProductDiscount").val().trim();
      if(discount==''||discount==0){
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'error',
          title: 'Đơn giá sản phẩm phải >0'
        })
      }else{
        $.ajax({
          type: "post",
          url: "http://127.0.0.1:3000/api/updateProductDiscount",
          data: {
              id:idProd,
              discount:discount,
          },
          dataType: "JSON",
          success: function (response) {
            if(response.check==true){
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'success',
                title: 'Thay đổi thành công'
              }).then(()=>{
                idProd='';
                window.location.reload();
              })
            }else{
              if(response.message.id){
                const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                  }
                })
                
                Toast.fire({
                  icon: 'error',
                  title: response.message.id
                })
              }else if(response.message.discount){
                const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                  }
                })
                
                Toast.fire({
                  icon: 'error',
                  title: response.message.discount
                })
              }
              else if(response.message){
                const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                  }
                })
                
                Toast.fire({
                  icon: 'error',
                  title: response.message
                })
              }
            }
          }
        });
      }
    });
  });

}
/*

---------------------------------------

*/

  function Restore(x) {
    var id =x;
    if(isNaN(id)==false){
      Swal.fire({
        icon:'question',
        text: 'Bạn muốn khôi phục hay xóa sản phẩm ?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Khôi phục',
        denyButtonText: `Xóa`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          $.ajax({
            type: "post",
            url: "http://127.0.0.1:3000/api/restoreProduct",
            data: {id:id},
            dataType: "JSON",
            success: function (response) {
                if(response.check==true){
                  const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'success',
                    title: 'Khôi phục thành công'
                  }).then(()=>{
                    window.location.reload();
                  })
                }else{
                  if(response.message.id){
                    const Toast = Swal.mixin({
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 3000,
                      timerProgressBar: true,
                      didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                      }
                    })
                    
                    Toast.fire({
                      icon: 'success',
                      title: response.message.id
                    })
                  }else if(response.message){
                    const Toast = Swal.mixin({
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 3000,
                      timerProgressBar: true,
                      didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                      }
                    })
                    
                    Toast.fire({
                      icon: 'error',
                      title: response.message
                    })
                  }
                }
            }
          });
        } else if (result.isDenied) {
          $.ajax({
            type: "post",
            url: "http://127.0.0.1:3000/api/deleteProduct2",
            data: {id:id},
            dataType: "JSON",
            success: function (response) {
                if(response.check==true){
                  const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'success',
                    title: 'Xóa thành công'
                  }).then(()=>{
                    window.location.reload();
                  })
                }else{
                  if(response.message.id){
                    const Toast = Swal.mixin({
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 3000,
                      timerProgressBar: true,
                      didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                      }
                    })
                    
                    Toast.fire({
                      icon: 'success',
                      title: response.message.id
                    })
                  }else if(response.message){
                    const Toast = Swal.mixin({
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 3000,
                      timerProgressBar: true,
                      didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                      }
                    })
                    
                    Toast.fire({
                      icon: 'error',
                      title: response.message
                    })
                  }
                }
            }
          });
          
        }
      })
    }

}
/*

---------------------------------------

*/  
function loadDeleteProduct(){
  $('#recycleBinBtn').click(function (e) { 
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "http://127.0.0.1:3000/api/loadDeleteProduct",
      dataType: "JSON",
      success: function (response) {
        if(response.check==true){
            if(response.products.length==0){
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'success',
                title: 'Không có sản phẩm trong giỏ rác'
              })
          }else{
            var str=``;
            var i=1;
            response.products.forEach(el => {
              str+=`
              <td class="p-3">`+(i++)+`</td>
              <td class="p-3">`+el['name']+`</td>
              <td class="p-2"> <button class="btn btn-info bg-info" onclick="Restore('`+el['idProd']+`')">Khôi phục</button></td>
              `;
            });
            $("#resultdeleteProduct").html(str);
            $("#deleteProductsModal").modal('show');
          }
        }
      }
    });
  });
} 
/*

---------------------------------------

*/  
function  deleteProduct(){
  $("#deleteProduct").click(function (e) { 
    e.preventDefault();
    var id = idProdEd;
    if(isNaN(id)==false){
      Swal.fire({
        icon:'question',
        text: 'Bạn muốn xóa sản phẩm?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Xóa',
        denyButtonText: `Không xóa`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          $.ajax({
            type: "post",
            url: "http://127.0.0.1:3000/api/deleteProduct",
            data: {id:id},
            dataType: "JSON",
            success: function (response) {
                if(response.check==true){
                  const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'success',
                    title: 'Xóa thành công'
                  }).then(()=>{
                    window.location.reload();
                  })
                }else{
                  if(response.message.id){
                    const Toast = Swal.mixin({
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 3000,
                      timerProgressBar: true,
                      didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                      }
                    })
                    
                    Toast.fire({
                      icon: 'error',
                      title: response.message.id
                    })
                  }else if(response.message){
                    const Toast = Swal.mixin({
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 3000,
                      timerProgressBar: true,
                      didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                      }
                    })
                    
                    Toast.fire({
                      icon: 'error',
                      title: response.message
                    })
                  }
                }
            }
          });
        } else if (result.isDenied) {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Giữ lại sản phẩm'
          })
        }
      })
    }
  });
}
/*

---------------------------------------

*/  
function switchProduct(){
  $(".switchProdBtn").change(function (e) { 
    e.preventDefault();
    var id=$(this).attr('data-id');
    $.ajax({
      type: "post",
      url: "http://127.0.0.1:3000/api/switchProduct",
      data: {id:id},
      dataType: "JSON",
      success: function (response) {
        if(response.check==true){
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'success',
            title: 'Chuyển thành công'
          })
        }else{
          if(response.message.id){
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'error',
              title: response.message.id
            })
          }else if(response.message){
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'error',
              title: response.message
            }).then(()=>{
              window.location.reload();
            })
          }
        }
      }
    });
  });
}
/*

---------------------------------------

*/  
var idStorage='';
function getStorage2(x){
  var id=x;
  $.ajax({
    type: "post",
    url: "http://127.0.0.1:3000/api/getStorage2",
    data: {id:id},
    dataType: "JSON",
    success: function (response) {
      if(response.check==true){
        var i=1;
        var str=``;
        console.log(response.storage);
        response.storage.forEach(el => {
          if(el['status']==0){
            str+=`
            <tr>
            <td class="p-3">`+(i++)+`</td>
            <td class="p-3"><button onclick="editStorageColor('`+el['id']+`','`+el['color']+`','`+id+`')" class="btn btn-outline-primary btn-sm">`+el['color']+`</button></td>
            <td class="p-3"><button onclick="editStorageSize('`+el['id']+`','`+el['idSize']+`','`+id+`')" class="btn btn-outline-primary btn-sm">`+el['sizename']+`</button></td>
            <td class="p-3"><button onclick="editStorageQuantity('`+el['id']+`','`+id+`')" class="btn btn-outline-secondary btn-sm">`+el['quantity']+`</button></td>
            <td class="p-3"><div class="tooglectn"><label class="switch">
            <input onclick="switchStorage('`+el['id']+`')" type="checkbox">
            <span class="slider round"></span>
              </label></div></td>
            </tr>
          `;
          }else{
            str+=`
            <tr>
            <td class="p-3">`+(i++)+`</td>
            <td class="p-3"><button onclick="editStorageColor('`+el['id']+`','`+el['color']+`','`+id+`')" class="btn btn-outline-primary btn-sm">`+el['color']+`</button></td>
            <td class="p-3"><button onclick="editStorageSize('`+el['id']+`','`+el['idSize']+`','`+id+`')" class="btn btn-outline-primary btn-sm">`+el['sizename']+`</button></td>
            <td class="p-3"><button onclick="editStorageQuantity('`+el['id']+`','`+id+`')" class="btn btn-outline-secondary btn-sm">`+el['quantity']+`</button></td>
            <td class="p-3"><div class="tooglectn"><label class="switch">
            <input checked onclick="switchStorage('`+el['id']+`')" type="checkbox">
            <span class="slider round"></span>
              </label></div></td>
            </tr>
          `;
          }
        });
        
        $('#resultStorage').html(str);
        $("#editStorageModal").modal('show');
      }
    }
  });
}
/*

---------------------------------------

*/  
function getStorage3(x){
  var id=x;
  $.ajax({
    type: "post",
    url: "http://127.0.0.1:3000/api/getStorage3",
    data: {id:id},
    dataType: "JSON",
    success: function (response) {
      if(response.check==true){
        var i=1;
        var str=``;
        console.log(response.storage);
        response.storage.forEach(el => {
          if(el['status']==0){
            str+=`
            <tr>
            <td class="p-3">`+(i++)+`</td>
            <td class="p-3"><button onclick="editStorageColor('`+el['id']+`','`+el['color']+`','`+id+`')" class="btn btn-outline-primary btn-sm">`+el['color']+`</button></td>
            <td class="p-3"><button onclick="editStorageSize('`+el['id']+`','`+el['idSize']+`','`+id+`')" class="btn btn-outline-primary btn-sm">`+el['sizename']+`</button></td>
            <td class="p-3"><button onclick="editStorageQuantity('`+el['id']+`','`+id+`')" class="btn btn-outline-secondary btn-sm">`+el['quantity']+`</button></td>
            <td class="p-3"><div class="tooglectn"><label class="switch">
            <input onclick="switchStorage('`+el['id']+`')" type="checkbox">
            <span class="slider round"></span>
              </label></div></td>
            </tr>
          `;
          }else{
            str+=`
            <tr>
            <td class="p-3">`+(i++)+`</td>
            <td class="p-3"><button onclick="editStorageColor('`+el['id']+`','`+el['color']+`','`+id+`')" class="btn btn-outline-primary btn-sm">`+el['color']+`</button></td>
            <td class="p-3"><button onclick="editStorageSize('`+el['id']+`','`+el['idSize']+`','`+id+`')" class="btn btn-outline-primary btn-sm">`+el['sizename']+`</button></td>
            <td class="p-3"><button onclick="editStorageQuantity('`+el['id']+`','`+id+`')" class="btn btn-outline-secondary btn-sm">`+el['quantity']+`</button></td>
            <td class="p-3"><div class="tooglectn"><label class="switch">
            <input checked onclick="switchStorage('`+el['id']+`')" type="checkbox">
            <span class="slider round"></span>
              </label></div></td>
            </tr>
          `;
          }
        });
        
        $('#resultStorage').html(str);
        $("#editStorageModal").modal('show');
      }
    }
  });
}

// =======================================================

function switchStorage(x){
  var id=x;
  $.ajax({
    type: "post",
    url: "http://127.0.0.1:3000/api/switchStorage",
    data: {id:id},
    dataType: "JSON",
    success: function (response) {
        if(response.check==true){
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Đã chuyển thành công'
          }).then(()=>{
            if(response.storage){
              var i=1;
              var str=``;
              response.storage.forEach(el => {
                if(el['status']==0){
                  str+=`
                  <tr>
                  <td class="p-3">`+(i++)+`</td>
                  <td class="p-3"><button onclick="editStorageColor('`+el['id']+`','`+el['color']+`','`+id+`')" class="btn btn-outline-primary btn-sm">`+el['color']+`</button></td>
                  <td class="p-3"><button onclick="editStorageSize('`+el['id']+`','`+el['idSize']+`','`+id+`')" class="btn btn-outline-primary btn-sm">`+el['sizename']+`</button></td>
                  <td class="p-3"><button onclick="editStorageQuantity('`+el['id']+`','`+id+`')" class="btn btn-outline-secondary btn-sm">`+el['quantity']+`</button></td>
                  <td class="p-3"><div class="tooglectn"><label class="switch">
                  <input onclick="switchStorage('`+el['id']+`')" type="checkbox">
                  <span class="slider round"></span>
                    </label></div></td>
                  </tr>
                `;
                }else{
                  str+=`
                  <tr>
                  <td class="p-3">`+(i++)+`</td>
                  <td class="p-3"><button onclick="editStorageColor('`+el['id']+`','`+el['color']+`','`+id+`')" class="btn btn-outline-primary btn-sm">`+el['color']+`</button></td>
                  <td class="p-3"><button onclick="editStorageSize('`+el['id']+`','`+el['idSize']+`','`+id+`')" class="btn btn-outline-primary btn-sm">`+el['sizename']+`</button></td>
                  <td class="p-3"><button onclick="editStorageQuantity('`+el['id']+`','`+id+`')" class="btn btn-outline-secondary btn-sm">`+el['quantity']+`</button></td>
                  <td class="p-3"><div class="tooglectn"><label class="switch">
                  <input checked onclick="switchStorage('`+el['id']+`')" type="checkbox">
                  <span class="slider round"></span>
                    </label></div></td>
                  </tr>
                `;
                }

              });
              $('#resultStorage').html(str);
        }
          })
        }else{
          if(response.message.id){
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'error',
              title: response.message.id
            })
          }else if(response.message){
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'error',
              title: response.message
            })
          }
        }
    }
  });
}
/*

---------------------------------------

*/  

function editStorageQuantity(x){
  var id=x;
  var newQty='';
  $("#editQuantityModal").modal('show');
  $("#newQty").keyup(function (e) { 
    newQty=$(this).val();
  });
  $('#SaveQuantityBtn').click(function (e) { 
    e.preventDefault();
    if(newQty==''){
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'error',
        title: 'Số lượng sản phẩm được chưa nhập'
      })
    }else{
      $.ajax({
        type: "post",
        url: "http://127.0.0.1:3000/api/updateQuantity",
        data: {
          id:id,
          qty:newQty
        },
        dataType: "JSON",
        success: function (response) {
          if(response.check==true){
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'success',
              title: 'Cập nhật thành công'
            }).then(()=>{
              $("#newQty").val('');
              id='';
              newQty='';
              $("#editStorageModal").modal('hide');
              window.location.reload();
              if(response.storage){
                var i=1;
                var str=``;
                // console.log(response.storage);
                response.storage.forEach(el => {
                  str+=`
                        <tr>
                        <td class="p-3">`+(i++)+`</td>
                        <td class="p-3"><button onclick="editStorageColor('`+el['id']+`','`+el['color']+`','`+id+`')" class="btn btn-outline-primary btn-sm">`+el['color']+`</button></td>
                        <td class="p-3"><button onclick="editStorageQuantity('`+el['id']+`','`+id+`')" class="btn btn-outline-secondary btn-sm">`+el['quantity']+`</button></td>
                        <td class="p-3"><div class="tooglectn"><label class="switch">
                        <input type="checkbox" onclick="switchStorage('`+el['id']+`')" checked>
                        <span class="slider round"></span>
                          </label></div></td>
                        </tr>
                      `;
                });
                
                $('#resultStorage').html(str);
                $("#editQuantityModal").modal('hide');
              }
            })
          }else{
            if(response.message.id){
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'error',
                title: response.message.id
              })
            }else if(response.message.qty){
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'error',
                title: response.message.qty
              })
            }else if(response.message){
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'error',
                title: response.message
              })
            }
          }
        }
      });
    }
  });
}
/*

---------------------------------------

*/  
function editStorageColor(x,y,z){
  var id=x;
  var name =y;
  var idProd=z;
  idStorage=id;
  $("#oldColor1").val(name);
  $("#editColorNameModal").modal('show');
  $("#submitEditColorname").click(function (e) { 
    e.preventDefault();
    var newname= $("#newColorName").val().trim();
    if(newname==$("#oldColor1").val()){
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'error',
        title: 'Tên màu sắc phải khác cũ'
      });
    }else{
      $.ajax({
        type: "post",
        url: "http://127.0.0.1:3000/api/editColorName",
        data: {
          id:id,
          color:newname,
          old:name,
          idProd:idProd
        },
        dataType: "JSON",
        success: function (response) {
          if(response.check==true){
            $("#editStorageModal").modal('hide');
            $("#editColorNameModal").modal('hide');
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'success',
              title: 'Thay đổi thành công'
            }).then(()=>{
              $("#newColorName").val('');
              getStorage2(idProd);
              id='';
              name='';
              idProd='';
            });
          }else if(response.check==false){
            if(response.color){
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'error',
                title: response.color
              })
            }else if(response.id){
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'error',
                title: response.id
              })
            }else if(response.old){
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'error',
                title: response.old
              })
            }else if(response.message){
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'error',
                title: response.message 
              })
            }
          }
        }
      });
    }
  });
  $("#deleteColorbtn").click(function (e) { 
    e.preventDefault();
    Swal.fire({
      icon:'question',
      text: 'Bạn có muốn xóa màu sản phẩm?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Xóa',
      denyButtonText: `Không xóa`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
       $.ajax({
        type: "post",
        url: "http://127.0.0.1:3000/api/deleteStorageColor",
        data: {id:idStorage},
        dataType: "JSON",
        success: function (response) {
          if(response.check==true){
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'success',
              title: 'Xóa màu thành công'
            }) 
            getStorage3(response.idProd);       
          }else{
            if(response.message.id){
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'success',
                title: response.message.id
              })
            }else if(response.message){
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'error',
                title: response.message
              })
            }
          }

        }
       });
      } else if (result.isDenied) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Giữ nguyên màu sắc'
        })
      }
    })
  });
}

/*

---------------------------------------

*/  
function editStorageSize(x,y,z){
  var idS=x;
  var b=y;
  var c=z;
  $("#editStorageProductSizeModal").modal('show');
  $("#switchStorageSize").click(function (e) { 
    e.preventDefault();
    var arr=$("#selectSizeAddMoreColor1 option:selected").val().split(',');
    var idSize= arr[0];
    $.ajax({
      type: "post",
      url: "http://127.0.0.1:3000/api/switchStorageSize",
      data: {
        idS:idS,
        idSize:idSize,
      },
      dataType: "JSON",
      success: function (response) {
        if(response.check==true){
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Đã thay đổi thành công'
          }).then(()=>{
            getStorage2(idS);
            $("#editStorageProductSizeModal").modal('hide');
          });
        }else if(response.check==false){
          if(response.message.idS){
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'error',
              title:response.message.idS
            })
          }else if(response.message.idSize){
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'error',
              title:response.message.idSize
            })
          }else if(response.message) {
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'error',
              title:response.message
            })
          }
        }
      }
    });
  });
}
/*

---------------------------------------

*/  
function editStorage(){
  var id='';
  $('.editStorageBtn').click(function (e) { 
    e.preventDefault();
    id=$(this).attr('data-id');
    $.ajax({
      type: "post",
      url: "http://127.0.0.1:3000/api/getStorage",
      data: {id:id},
      dataType: "JSON",
      success: function (response) {
        if(response.check==true){        
          var i=1;
          var str=``;
          // console.log(response.storage);
          response.storage.forEach(el => {
            if(el['status']==0){
              str+=`
              <tr>
              <td class="p-3">`+(i++)+`</td>
              <td class="p-3"><button onclick="editStorageColor('`+el['id']+`','`+el['color']+`','`+id+`')" class="btn btn-outline-primary btn-sm">`+el['color']+`</button></td>
              <td class="p-3"><button onclick="editStorageSize('`+el['id']+`','`+el['idSize']+`','`+id+`')" class="btn btn-outline-primary btn-sm">`+el['sizename']+`</button></td>
              <td class="p-3"><button onclick="editStorageQuantity('`+el['id']+`','`+id+`')" class="btn btn-outline-secondary btn-sm">`+el['quantity']+`</button></td>
              <td class="p-3"><div class="tooglectn"><label class="switch">
              <input onclick="switchStorage('`+el['id']+`')" type="checkbox">
              <span class="slider round"></span>
                </label></div></td>
              </tr>
            `;
            }else{
              str+=`
              <tr>
              <td class="p-3">`+(i++)+`</td>
              <td class="p-3"><button onclick="editStorageColor('`+el['id']+`','`+el['color']+`','`+id+`')" class="btn btn-outline-primary btn-sm">`+el['color']+`</button></td>
              <td class="p-3"><button onclick="editStorageSize('`+el['id']+`','`+el['idSize']+`','`+id+`')" class="btn btn-outline-primary btn-sm">`+el['sizename']+`</button></td>
              <td class="p-3"><button onclick="editStorageQuantity('`+el['id']+`','`+id+`')" class="btn btn-outline-secondary btn-sm">`+el['quantity']+`</button></td>
              <td class="p-3"><div class="tooglectn"><label class="switch">
              <input checked onclick="switchStorage('`+el['id']+`')" type="checkbox">
              <span class="slider round"></span>
                </label></div></td>
              </tr>
            `;
            }

          });
          
          $('#resultStorage').html(str);
          $("#editStorageModal").modal('show');
        }
      }
    });
  });
  var count=0;
    $("#addStorageColorBtn").click(function (e) { 
      e.preventDefault();
      $("#addMoreColorModal").modal('show');
      $('#submitaddmorecolorbtn').click(function (e) { 
        e.preventDefault();
        var coloraddMore=$("#coloraddmore").val().trim();
        var qtyaddmore=$("#qtyaddmore").val().trim();
        var sizearr=$("#selectSizeAddMoreColor option:selected").val();
        var arr=sizearr.split(',');
        var idSize= arr[0];
        if(isNaN(qtyaddmore)==true||qtyaddmore==''||qtyaddmore<0){
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'error',
            title: 'Số lượng không hợp lệ hoặc chưa được nhập'
          })
        }else if(coloraddMore==''){
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'error',
            title: 'Tên màu không được bỏ trống'
          })
        }else{
          if(count==0){
            count=count+1;
            $.ajax({
              type: "post",
              url: "http://127.0.0.1:3000/api/addMoreColorStorage",
              data: {
                color:coloraddMore,
                qty:qtyaddmore,
                idProd:id,
                idSize:idSize,
              },
              dataType: "JSON",
              success: function (response) {
                if(response.check==true){
                  const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'success',
                    title: 'Đã thêm thành công'
                  }).then(()=>{
                    if(response.storage){
                      var i=1;
                      var str=``;
                      // console.log(response.storage);
                      response.storage.forEach(el => {
                        if(el['status']==0){
                          str+=`
                          <tr>
                          <td class="p-3">`+(i++)+`</td>
                          <td class="p-3"><button onclick="editStorageColor('`+el['id']+`','`+el['color']+`','`+id+`')" class="btn btn-outline-primary btn-sm">`+el['color']+`</button></td>
                          <td class="p-3"><button onclick="editStorageSize('`+el['id']+`','`+el['idSize']+`','`+id+`')" class="btn btn-outline-primary btn-sm">`+el['sizename']+`</button></td>
                          <td class="p-3"><button onclick="editStorageQuantity('`+el['id']+`','`+id+`')" class="btn btn-outline-secondary btn-sm">`+el['quantity']+`</button></td>
                          <td class="p-3"><div class="tooglectn"><label class="switch">
                          <input onclick="switchStorage('`+el['id']+`')" type="checkbox">
                          <span class="slider round"></span>
                            </label></div></td>
                          </tr>
                        `;
                        }else{
                          str+=`
                          <tr>
                          <td class="p-3">`+(i++)+`</td>
                          <td class="p-3"><button onclick="editStorageColor('`+el['id']+`','`+el['color']+`','`+id+`')" class="btn btn-outline-primary btn-sm">`+el['color']+`</button></td>
                          <td class="p-3"><button onclick="editStorageSize('`+el['id']+`','`+el['idSize']+`','`+id+`')" class="btn btn-outline-primary btn-sm">`+el['sizename']+`</button></td>
                          <td class="p-3"><button onclick="editStorageQuantity('`+el['id']+`','`+id+`')" class="btn btn-outline-secondary btn-sm">`+el['quantity']+`</button></td>
                          <td class="p-3"><div class="tooglectn"><label class="switch">
                          <input checked onclick="switchStorage('`+el['id']+`')" type="checkbox">
                          <span class="slider round"></span>
                            </label></div></td>
                          </tr>
                        `;
                        }
                      });
                      
                      $('#resultStorage').html(str);
                      $("#coloraddmore").val('');
                      $("#qtyaddmore").val('');
                      $("#addMoreColorModal").modal('hide');
                      count=0;
                    }
                  });
                }else{
                  if(response.message.color){
                    const Toast = Swal.mixin({
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 3000,
                      timerProgressBar: true,
                      didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                      }
                    })
                    
                    Toast.fire({
                      icon: 'error',
                      title: response.message.color
                    }).then(()=>{
                      count=0;
                    })
                  }else if(response.message.id){
                    const Toast = Swal.mixin({
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 3000,
                      timerProgressBar: true,
                      didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                      }
                    })
                    
                    Toast.fire({
                      icon: 'error',
                      title: response.message.id
                    }).then(()=>{
                      count=0;
                    })
                  }else if(response.message.qty){
                    const Toast = Swal.mixin({
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 3000,
                      timerProgressBar: true,
                      didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                      }
                    })
                    
                    Toast.fire({
                      icon: 'error',
                      title: response.message.qty
                    }).then(()=>{
                      count=0;
                    })
                  }else if(response.message){
                    const Toast = Swal.mixin({
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 3000,
                      timerProgressBar: true,
                      didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                      }
                    })
                    
                    Toast.fire({
                      icon: 'error',
                      title: response.message
                    }).then(()=>{
                      count=0;
                    })
                  }
                }
              }
            });
          }

        }

      });
    });
}
/*

---------------------------------------

*/  
function editProd(){
  $('#editImages').change(function (e) { 
    e.preventDefault();
    var image=this.files;
    var accept=['gif', 'jpeg', 'png','webp','jpg','JPG','GIF', 'JPEG', 'PNG','WEBP'];
    Object.entries(image).forEach(el => {
        var type = getFileExtension(el[1]['name']);
        if(accept.includes(type)){
            file2.push(el[1]);
        }
    });
    var str= fetch(file2);
    $("#image2area").html(str);
  });
  $("#productNameEdit").keyup(function (e) { 
    productName=$("#productNameEdit").val().trim()
    slug= ChangeToSlug(productName);
    $("#slugEdit").val(slug);
  });
  $("#editProdBtn").click(function (e) { 
    e.preventDefault();
      if(productName==''){
        productName=$("#productNameEdit").val().trim();
      }
      price=$("#priceEdit").val();
      discount=$("#discountEdit").val();
      brandId=$("#brandSelectorEdit option:selected").val();
      cateId=$("#cateSelectorEdit option:selected").val();
      content=CKEDITOR.instances["contentEdit"].getData().trim();;
      if(productName==''){
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'error',
          title: 'Thiếu tên sản phẩm'
        })
      }else if(discount==''){
        discount=0;
      }else if(content==''){
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'error',
          title: 'Thiếu nội dung sản phẩm'
        })
      }else{
        var formData = new FormData();
        if(file2.length==0){
          formData.append('productName',productName);
          // formData.append('colors',colors);
          formData.append('slug',$("#slugEdit").val());
          formData.append('price',price);
          formData.append('discount',discount);
          formData.append('brandId',brandId);
          formData.append('cateId',cateId);
          formData.append('content',content);
          formData.append('token',token);
          formData.append('id',idProdEd);
        }else{
          formData.append('productName',productName);
          for (let index = 0; index < file2.length; index++) {
            formData.append('files[]', file2[index]);
          }
          formData.append('slug',$("#slugEdit").val());
          formData.append('price',price);
          formData.append('discount',discount);
          formData.append('brandId',brandId);
          formData.append('cateId',cateId);
          formData.append('content',content);
          formData.append('token',token);
          formData.append('id',idProdEd);
        }
        $.ajax({
          type: "post",
          url: "http://127.0.0.1:3000/api/editProd",
          data: formData,
          contentType: false,
          cache: false,
          processData: false,
          dataType: "JSON",
          success: function (response) {
            if(response.check==true){
              const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                  }
                })
                
                Toast.fire({
                  icon: 'success',
                  title: 'Đã thay đổi thành công'
                }).then(()=>{
                    file2=[];
                    file=[];
                    imageprod='';
                    colors=[];
                    slug='';
                    price='';
                    discount='';
                    brandId='';
                    cateId='';
                    content='';
                    productName ='';
                  window.location.reload();
                })
          }else{
              if(response.message.productName){
                  const Toast = Swal.mixin({
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 3000,
                      timerProgressBar: true,
                      didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                      }
                    })
                    
                    Toast.fire({
                      icon: 'error',
                      title: response.message.productName
                    })
              
              }else if(response.message.slug){
                  const Toast = Swal.mixin({
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 3000,
                      timerProgressBar: true,
                      didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                      }
                    })
                    
                    Toast.fire({
                      icon: 'error',
                      title: response.message.slug
                    })
              }else if( response.message.price){
                  const Toast = Swal.mixin({
                          toast: true,
                          position: 'top-end',
                          showConfirmButton: false,
                          timer: 3000,
                          timerProgressBar: true,
                          didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                          }
                  })
                        
                  Toast.fire({
                          icon: 'error',
                          title: response.message.price
                  })
              }else if( response.message.discount){
                  const Toast = Swal.mixin({
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 3000,
                      timerProgressBar: true,
                      didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                      }
                    })
                    
                    Toast.fire({
                      icon: 'error',
                      title: response.message.discount
                    })
              }else if( response.message.brandId){
                  const Toast = Swal.mixin({
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 3000,
                      timerProgressBar: true,
                      didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                      }
                    })
                    
                    Toast.fire({
                      icon: 'error',
                      title: response.message.brandId
                    })
              }else if( response.message.cateId){
                  const Toast = Swal.mixin({
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 3000,
                      timerProgressBar: true,
                      didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                      }
                    })
                    
                    Toast.fire({
                      icon: 'error',
                      title: response.message.cateId
                    })
              }else if( response.message.content){
                  const Toast = Swal.mixin({
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 3000,
                      timerProgressBar: true,
                      didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                      }
                    })
                    
                    Toast.fire({
                      icon: 'error',
                      title: response.message.content
                    })

              }else if( response.message.imageprod){
                  const Toast = Swal.mixin({
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 3000,
                      timerProgressBar: true,
                      didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                      }
                    })
                    
                    Toast.fire({
                      icon: 'error',
                      title: response.message.imageprod
                    })
              }else if( response.message.files){
                  const Toast = Swal.mixin({
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 3000,
                      timerProgressBar: true,
                      didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                      }
                    })
                    
                    Toast.fire({
                      icon: 'error',
                      title: response.message.files
                    })
              }else if( response.message.colors){
                  const Toast = Swal.mixin({
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 3000,
                      timerProgressBar: true,
                      didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                      }
                    })
                    
                    Toast.fire({
                      icon: 'error',
                      title: response.message.colors
                    })
              }else{
                  const Toast = Swal.mixin({
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 3000,
                      timerProgressBar: true,
                      didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                      }
                    })
                    
                    Toast.fire({
                      icon: 'error',
                      title: response.message
                    })
              }
          }
          }
        });
      }
  });
}
/*

---------------------------------------

*/  
var idProdEd='';
function recallImage(x){
  var name =x;
  $.ajax({
    type: "post",
    url: "http://127.0.0.1:3000/api/recallImageGallery",
    data: {name:name},
    dataType: "JSON",
    success: function (response) {
      if(response.check==true){
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Lấy lại hình ảnh thành công'
        }).then(()=>{
          $("#deleteImageModal").modal('hide');
          reloadImage(idProdEd,'resultimage');
        });
      }
    }
  });
}
/*

---------------------------------------

*/  
function loaddeleteImage(){
  $("#recylebinimg").click(function (e) { 
    e.preventDefault();
    if(idProdEd!=''){
      $.ajax({
        type: "post",
        url: "http://127.0.0.1:3000/api/deleteImageGallery",
        data: {id:idProdEd},
        dataType: "JSON",
        success: function (response) {
          if(response.check==true){
           var str=``;
           response.images.forEach(el1 => {
                str+=`
                <div style="padding:5px 5px" class="col-sm-2 m-3">
                <img style="width:100%"  onclick="recallImage('`+el1['imagename']+`')" src="`+el1['link']+`" alt="">
                </div>
                `;
          }); 
          $("#resultdeleteimage").html(str);
          $("#deleteImageModal").modal('show');
          }
        }
      });
    }
  });
}
/*

---------------------------------------

*/  
function reloadImage(x,y){
  var id =x;
  var result=``;
  var desternation=y;
  if(isNaN(id)==false){
    $.ajax({
      type: "post",
      url: "http://127.0.0.1:3000/api/loadImageSingleProd",
      data: {id:id},
      dataType: "JSON",
      success: function (response) {
        if(response.check==true){
          var count=0
          response.images.forEach(el1 => {
            if(count==0){
              result+=`
              <div style="border:3px solid red;padding:5px 5px" class="col-sm-2 m-3">
              <img style="width:100%"  onclick="editChooseImage('`+el1['imagename']+`')" src="`+el1['link']+`" alt="">
              </div>
              `;
            }else{
              result+=`
              <div class="col-sm-2 m-3">
              <img style="width:100%" onclick="editChooseImage('`+el1['imagename']+`')" src="`+el1['link']+`" alt="">
              </div>
              `;
            }
            count++;
          });
          $("#"+desternation).html(result);
        }
      }
    });  
    
  }
}
/*

---------------------------------------

*/  
function editChooseImage(x){
  var name = x;
  Swal.fire({
    icon:'question',
    text: 'Bạn muốn chọn ảnh này hay xóa?',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'Chọn',
    denyButtonText: `Xóa`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      $.ajax({
        type: "post",
        url: "http://127.0.0.1:3000/api/updatedSelectedImage",
        data: {name:name,id:idProdEd},
        dataType: "JSON",
        success: function (response) {
          if(response.check==true){
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'success',
              title: 'Chuyển đổi thành công'
            }).then(()=>{
              reloadImage(idProdEd,'resultimage');
            });
          }
        }
      });
    } else if (result.isDenied) {
      $.ajax({
        type: "post",
        url: "http://127.0.0.1:3000/api/deleteProductImage",
        data: {name:name,id:idProdEd},
        dataType: "JSON",
        success: function (response) {
          if(response.check==true){
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'success',
              title: 'Xóa ảnh thành công'
            }).then(()=>{
              reloadImage(idProdEd,'resultimage');
            });
          }
        }
      });
    }
  })
}
/*

---------------------------------------

*/  
function loadEditProd(){
  $('.editProductBtn').click(function (e) { 
    e.preventDefault();
    var idProd=$(this).attr('data-id');
    if(isNaN(idProd)==false){
      $.ajax({
        type: "post",
        url: "http://127.0.0.1:3000/api/getSingle",
        data: {id:idProd},
        dataType: "JSON",
        success: function (response) {
          if(response.check==true){
            idProdEd=idProd;
            response.product.forEach(el => {
              $("#productNameEdit").val(el['name']);
              $("#slugEdit").val(el['slug']);
              $("#priceEdit").val(el['price']);
              $("#discountEdit").val(el['discount']);
              $("#brandSelectorEdit").val(el['idBrand']);
              $("#cateSelectorEdit").val(el['idCate']);
              CKEDITOR.instances['contentEdit'].setData(el['content']);
            });
            var str=``;
            var count=0
            response.images.forEach(el1 => {
              if(count==0){
                if(el1['status']!=2){
                  str+=`
                  <div style="border:3px solid red;padding:5px 5px" class="col-sm-2 m-3">
                  <img style="width:100%"  onclick="editChooseImage('`+el1['imagename']+`')" src="`+el1['link']+`" alt="">
                  </div>
                  `;
                }
              }else{
                if(el1['status']!=2){
                  str+=`
                  <div class="col-sm-2 m-3">
                  <img style="width:100%" onclick="editChooseImage('`+el1['imagename']+`')" src="`+el1['link']+`" alt="">
                  </div>
                  `;
                }

              }
              count++;
            });
            $("#resultimage").html(str);
            $("#editProductModal").modal('show');
          }else{
            if(response.message.id){
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'success',
                title: response.message.id
              })
            }else if(response.message){
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'success',
                title: response.message
              })
            }
          }
        }
      });
    }
  });
}
/*

---------------------------------------

*/  
var file=[];
var file2=[];
var imageprod='';
var colors=[];
var slug='';
var price='';
var discount='';
var brandId='';
var cateId='';
var content='';
var gender='';
var productName ='';
function addProduct(){
  $('#productName').keyup(function (e) { 
    productName=$("#productName").val().trim();
    slug= ChangeToSlug(productName);
    $("#slug").val(slug);
});
$('#page1next').click(function (e) { 
    e.preventDefault();
    $("#page2next").attr('disabled', true);
    e.preventDefault();
    price=$("#price").val();
    discount=$("#discount").val();
    brandId=$("#brandSelector option:selected").val();
    cateId=$("#cateSelector option:selected").val();
    content=CKEDITOR.instances["content"].getData().trim();
    if(price==''||price==0||discount==''||content==''){
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'error',
            title: 'Thiếu thành phần thông tin sản phẩm'
          })            
    }else{
        run(1, 2);
        var item=[];
        $('#images').change(function (e) { 
            e.preventDefault();
            item=this.files;
            var accept=['gif', 'jpeg', 'png','webp','jpg','JPG','GIF', 'JPEG', 'PNG','WEBP'];
            Object.entries(this.files).forEach(el => {
                var type = getFileExtension(el[1]['name']);
                if(accept.includes(type)){
                    file.push(el[1]);
                }
            });
           var str= fetch(file);
            $("#resultImage").html(str);
        });
    }
});
$("#page2next").click(function (e) { 
    e.preventDefault();
    if(file.length>0&&imageprod!=''){
        run(2,3);
    }else{
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'error',
        title: 'Bạn vui lòng thêm hình ảnh và lựa chọn hình ảnh đại diện sản phẩm '
      })            
    }
    $("#addQty").click(function (e) { 
        e.preventDefault();
        $("#addQuantityModal").modal('show');
        $("#addQtyBtn").click(function (e) { 
            e.preventDefault();
            var color=$("#colorNew").val().trim();
            var qty= $("#QtyNew").val().trim();
            var sizeInfo = $("#selectSizeid option:selected").val();
            var arrsize=sizeInfo.split(',');
            var idSize= arrsize[0];
            var sizename= arrsize[1];
            console.log(idSize,sizename,color,qty);
            if(color==''){

            }else if(qty==''||qty==0){
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'error',
                    title: 'Số lượng sản phẩm phải khác 0'
                  })
            }else{
                colors.push([color,qty,idSize,sizename]);
                var str2 = renderColor(colors);
                $("#resultQty").html(str2);
            }
            $("#colorNew").val('');
            $("#QtyNew").val('');
            console.log(colors);
        });
    });
});
$("#submitProductBtn").click(function (e) { 
    e.preventDefault();
    if(colors.length==0){
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'error',
          title: 'Màu sắc sản phẩm chưa được nhập'
        })
    }else{
        Swal.fire({
            icon:'question',
          text: 'Sản phẩm dành cho nam hay nữ?',
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: 'Nam',
          denyButtonText: `Nữ`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
          var formData = new FormData();
          colors= JSON.stringify(colors);
          formData.append('productName',productName);
          formData.append('colors',colors);
          formData.append('slug',slug);
          formData.append('price',price);
          formData.append('discount',discount);
          formData.append('brandId',brandId);
          formData.append('gender',1);
          formData.append('cateId',cateId);
          formData.append('content',content);
          formData.append('imageprod',imageprod);
          for (let index = 0; index < file.length; index++) {
              formData.append('files[]', file[index]);
          }
    formData.append('token',token);
    $.ajax({
        type: "post",
        url: "http://127.0.0.1:3000/api/addProd",
        data: formData,
        contentType: false,
        cache: false,
        processData: false,
        dataType: "JSON",
        success: function (response) {
            if(response.check==true){
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'success',
                    title: 'Đã thêm thành công'
                  }).then(()=>{
                      file=[];
                      imageprod='';
                      colors=[];
                      slug='';
                      price='';
                      discount='';
                      brandId='';
                      cateId='';
                      content='';
                      productName ='';
                    window.location.reload();
                  })
            }else{
                if(response.message.productName){
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                      })
                      
                      Toast.fire({
                        icon: 'error',
                        title: response.message.productName
                      })
                
                }else if(response.message.slug){
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                      })
                      
                      Toast.fire({
                        icon: 'error',
                        title: response.message.slug
                      })
                }else if( response.message.price){
                    const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                              toast.addEventListener('mouseenter', Swal.stopTimer)
                              toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                    })
                          
                    Toast.fire({
                            icon: 'error',
                            title: response.message.price
                    })
                }else if( response.message.gender){
                    const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                              toast.addEventListener('mouseenter', Swal.stopTimer)
                              toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                    })
                          
                    Toast.fire({
                            icon: 'error',
                            title: response.message.gender
                    })
                }else if( response.message.discount){
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                      })
                      
                      Toast.fire({
                        icon: 'error',
                        title: response.message.discount
                      })
                }else if( response.message.brandId){
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                      })
                      
                      Toast.fire({
                        icon: 'error',
                        title: response.message.brandId
                      })
                }else if( response.message.cateId){
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                      })
                      
                      Toast.fire({
                        icon: 'error',
                        title: response.message.cateId
                      })
                }else if( response.message.content){
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                      })
                      
                      Toast.fire({
                        icon: 'error',
                        title: response.message.content
                      })

                }else if( response.message.imageprod){
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                      })
                      
                      Toast.fire({
                        icon: 'error',
                        title: response.message.imageprod
                      })
                }else if( response.message.files){
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                      })
                      
                      Toast.fire({
                        icon: 'error',
                        title: response.message.files
                      })
                }else if( response.message.colors){
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                      })
                      
                      Toast.fire({
                        icon: 'error',
                        title: response.message.colors
                      })
                }else{
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                      })
                      
                      Toast.fire({
                        icon: 'error',
                        title: response.message
                      })
                }
            }
        }
    });
          } else if (result.isDenied) {
              var formData = new FormData();
            colors= JSON.stringify(colors);
            formData.append('productName',productName);
            formData.append('colors',colors);
            formData.append('slug',slug);
            formData.append('price',price);
            formData.append('gender',0);
            formData.append('discount',discount);
            formData.append('brandId',brandId);
            formData.append('cateId',cateId);
            formData.append('content',content);
            formData.append('imageprod',imageprod);
    for (let index = 0; index < file.length; index++) {
        formData.append('files[]', file[index]);
    }
    formData.append('token',token);
    $.ajax({
        type: "post",
        url: "http://127.0.0.1:3000/api/addProd",
        data: formData,
        contentType: false,
        cache: false,
        processData: false,
        dataType: "JSON",
        success: function (response) {
            if(response.check==true){
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'success',
                    title: 'Đã thêm thành công'
                  }).then(()=>{
                      file=[];
                      imageprod='';
                      colors=[];
                      slug='';
                      price='';
                      discount='';
                      brandId='';
                      cateId='';
                      content='';
                      productName ='';
                    window.location.reload();
                  })
            }else{
                if(response.message.productName){
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                      })
                      
                      Toast.fire({
                        icon: 'error',
                        title: response.message.productName
                      })
                
                }else if(response.message.slug){
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                      })
                      
                      Toast.fire({
                        icon: 'error',
                        title: response.message.slug
                      })
                }else if( response.message.price){
                    const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                              toast.addEventListener('mouseenter', Swal.stopTimer)
                              toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                    })
                          
                    Toast.fire({
                            icon: 'error',
                            title: response.message.price
                    })
                }else if( response.message.discount){
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                      })
                      
                      Toast.fire({
                        icon: 'error',
                        title: response.message.discount
                      })
                }else if( response.message.brandId){
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                      })
                      
                      Toast.fire({
                        icon: 'error',
                        title: response.message.brandId
                      })
                }else if( response.message.cateId){
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                      })
                      
                      Toast.fire({
                        icon: 'error',
                        title: response.message.cateId
                      })
                }else if( response.message.content){
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                      })
                      
                      Toast.fire({
                        icon: 'error',
                        title: response.message.content
                      })

                }else if( response.message.imageprod){
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                      })
                      
                      Toast.fire({
                        icon: 'error',
                        title: response.message.imageprod
                      })
                }else if( response.message.files){
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                      })
                      
                      Toast.fire({
                        icon: 'error',
                        title: response.message.files
                      })
                }else if( response.message.colors){
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                      })
                      
                      Toast.fire({
                        icon: 'error',
                        title: response.message.colors
                      })
                }else{
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                      })
                      
                      Toast.fire({
                        icon: 'error',
                        title: response.message
                      })
                }
            }
        }
    });
          }
        })

    }
    
});
}
/*

---------------------------------------

*/  
function removeQty(x){
    var name = x;
    var arr1=[];
    colors.forEach(el => {
        if(el[0]!=name){
            arr1.push(el);
        }
    });
    colors=arr1;
    var str2 = renderColor(colors);
    $("#resultQty").html(str2);
}
/*

---------------------------------------

*/  
function renderColor(y){
    var data = y;
    var str=``;
    str+=`
        <div class="row mb-2">
    `;
    data.forEach(el => {
        str+=`
        <div class="col-sm-2" >
            <label for="" class="form-label"><p onclick="removeQty('`+el[0]+`')">`+el[0]+`</p></label>
            <label for="" class="form-label"><p>Size: `+el[3]+`</p></label>
            
            <input type="text" name="" id="" disabled class="form-control" value="`+el[1]+`">
        </div>
        `;
    });
    str+=`
        </div>
    `;
    return str
}
/*

---------------------------------------

*/  
function deleteImageGallery(x){
    var name =x;
    Swal.fire({
        icon:'question',
        text: 'Bạn muốn chọn hình làm đại diện sản phẩm hay xóa?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Chọn',
        denyButtonText: `Xóa ảnh`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            imageprod=name;
            var str= fetch(file);
            $("#resultImage").html(str);
        } else if (result.isDenied) {
            var arr=[];
            if(file.length==0){
              file2.forEach(el => {
                if(el['name']!=name){
                    arr.push(el);
                }
              });
              file2=arr;
              var str= fetch(file2);
              $("#image2area").html(str);
            }else{
              file.forEach(el => {
                if(el['name']!=name){
                    arr.push(el);
                }
              });
              file=arr;
              var str= fetch(file);
              $("#resultImage").html(str);
            }

        }
      })
    
}

// =================================================

function fetch(data){
    var arr=data;
    var str=``;
    str+=`
    <div class="row mb-3">
    `;
    arr.forEach(el => {
        var url=URL.createObjectURL(el);
        if(el["name"]==imageprod){
            str+=`
            <div style="border:3px solid red;padding:5px 5px" class="col-sm-3 mb-3">
                <img class="deleteImage" onclick="deleteImageGallery('`+el['name']+`')" data-id="`+el['name']+`" style="width:100%;height:200px" src="`+url+`" alt="">
            </div>`;
        }else{
            str+=`
            <div  class="col-sm-3 mb-3">
                <img class="deleteImage" onclick="deleteImageGallery('`+el['name']+`')" data-id="`+el['name']+`" style="width:100%;height:200px" src="`+url+`" alt="">
            </div>`;
        }
      
    });
    str+=`
    </div>
    `;
    return str;
}
/*

---------------------------------------

*/  
function fetch2(data){
  var arr=data;
  var str=``;
  str+=`
  <div class="row mb-3">
  `;
  arr.forEach(el => {
      var url=URL.createObjectURL(el);
      if(el["name"]==imageprod){
          str+=`
          <div style="border:3px solid red;padding:5px 5px" class="col-sm-3 mb-3">
              <img class="deleteImage" onclick="deleteImageGallery('`+el['name']+`')" data-id="`+el['name']+`" style="width:100%;height:200px" src="`+url+`" alt="">
          </div>`;
      }else{
          str+=`
          <div  class="col-sm-3 mb-3">
              <img class="deleteImage" onclick="deleteImageGallery('`+el['name']+`')" data-id="`+el['name']+`" style="width:100%;height:200px" src="`+url+`" alt="">
          </div>`;
      }
    
  });
  str+=`
  </div>
  `;
  return str;
}
/*

---------------------------------------

*/  
function getFileExtension(filename){

    // get file extension
    const extension = filename.split('.').pop();
    return extension;
}
/*

---------------------------------------

*/  
function run(hideTab, showTab){
    if(hideTab < showTab){ // If not press previous button
      // Validation if press next button
      var currentTab = 0;
      x = $('#tab-'+hideTab);
      y = $(x).find("input")
      for (i = 0; i < y.length; i++){
        if (y[i].value == ""){
          $(y[i]).css("background", "#ffdddd");
          return false;
        }
      }
    }

    // Progress bar
    for (i = 1; i < showTab; i++){
      $("#step-"+i).css("opacity", "1");
    }

    // Switch tab
    $("#tab-"+hideTab).css("display", "none");
    $("#tab-"+showTab).css("display", "block");
    $("input").css("background", "#fff");
}
/*

---------------------------------------

*/  
function ChangeToSlug(x)
{
    var title, slug;
 
    //Lấy text từ thẻ input title 
    title = x;
 
    //Đổi chữ hoa thành chữ thường
    slug = title.toLowerCase();
 
    //Đổi ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    //Xóa các ký tự đặt biệt
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    //Đổi khoảng trắng thành ký tự gạch ngang
    slug = slug.replace(/ /gi, "-");
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');
    //In slug ra textbox có id “slug”
    return slug
}
/*

---------------------------------------

*/  