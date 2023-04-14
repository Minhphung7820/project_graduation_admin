const host = 'http://localhost:3000/';
const token = $("#token").val();
$(document).ready(function () {
  $.ajaxSetup({
    data: {
      'token': token
    }
  });
  add();
  switchSTT();
  editSizeName();
  editSizeInfo();
  deleteSize();
});
function deleteSize() {
  $('.deleteSizebtn').click(function (e) {
    e.preventDefault();
    var id = $(this).attr('data-id');
    Swal.fire({
      icon:'question',
      text: 'Bạn muốn xóa size?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Đúng',
      denyButtonText: `Không`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        $.ajax({
          type: "post",
          url: host + 'api/deleteSize',
          data: {
            id: id,
          },
          dataType: "JSON",
          success: function (response) {
            if (response.check == true) {
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
                title: 'Đã xóa thành công'
              }).then(() => {
                window.location.reload();
              })
            } else if (response.check == false) {
              if (response.message.id) {
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
              } else if (response.message) {
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
          title: 'Không đổi'
        })
      }
    })
  });
}
function editSizeInfo() {
  $(".editSizeInfo").click(function (e) {
    e.preventDefault();
    var id = $(this).attr('data-id');
    var element = $(this).parent();
    var str = `<input type="text" class="form-control" id="editSizeInfoArea" placeholder="Thông tin ">`;
    element.html(str);
    $("#editSizeInfoArea").keyup(function (e) {
      if (e.key === "Escape") {
        window.location.reload();
      } else if (e.key === "Enter") {
        var sizeinfo = $("#editSizeInfoArea").val().trim();
        if (sizeinfo == '') {
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
            title: 'Bạn chưa nhập thông tin mới'
          })
        } else {
          Swal.fire({
            icon: 'question',
            text: 'Bạn muốn sửa thông tin size ?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Đúng',
            denyButtonText: `Không`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              $.ajax({
                type: "post",
                url: host + 'api/updateSizeInfo',
                data: {
                  id: id,
                  info: sizeinfo,
                },
                dataType: "JSON",
                success: function (response) {
                  if (response.check == true) {
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
                    }).then(() => {
                      window.location.reload();
                    })
                  } else if (response.check == false) {
                    if (response.message.info) {
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
                        title: response.message.info
                      })
                    } else if (response.message) {
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
                title: 'Không đổi'
              })
            }
          })
        }
      }
    });
  });
}
function editSizeName() {
  $(".editSizeName").click(function (e) {
    e.preventDefault();
    var id = $(this).attr('data-id');
    var element = $(this).parent();
    var str = `<input type="text" class="form-control" id="editSizeNameArea" placeholder="Tên ">`;
    element.html(str);
    $("#editSizeNameArea").keyup(function (e) {
      if (e.key === "Escape") {
        window.location.reload();
      } else if (e.key === "Enter") {
        var sizeName = $("#editSizeNameArea").val().trim();
        if (sizeName == '') {
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
            title: 'Bạn chưa nhập tên mới'
          })
        } else {
          Swal.fire({
            icon: 'question',
            text: 'Bạn muốn sửa tên size ?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Đúng',
            denyButtonText: `Không`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              $.ajax({
                type: "post",
                url: host + 'api/updateSizeName',
                data: {
                  id: id,
                  name: sizeName,
                },
                dataType: "JSON",
                success: function (response) {
                  if (response.check == true) {
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
                    }).then(() => {
                      window.location.reload();
                    })
                  } else if (response.check == false) {
                    if (response.message.name) {
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
                    } else if (response.message) {
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
                title: 'Không đổi'
              })
            }
          })
        }
      }
    });
  });
}
function add() {
  $("#submitAddSizeBtn").click(function (e) {
    e.preventDefault();
    var sizename = $("#newSizename").val().trim();
    var sizeinfo = $("#newSizeinfo").val().trim();
    if (sizename == '') {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'error',
        title: 'Thiếu tên size'
      })
    } else if (sizeinfo == '') {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'error',
        title: 'Thông tin size chưa được điền'
      })

    } else {
      $.ajax({
        type: "post",
        url: host + "api/addSize",
        data: {
          sizename: sizename,
          sizeinfo: sizeinfo,
        },
        dataType: "JSON",
        success: function (response) {
          if (response.check == true) {
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
            }).then(() => {
              window.location.reload();
            })
          } else if (response.check == false) {
            if (response.message.sizename) {
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
                title: response.message.sizename
              })
            } else if (response.message.sizeinfo) {
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
                title: response.message.sizeinfo
              })
            } else if (response.message) {
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
function switchSTT() {
  $(".sizeStt").click(function (e) {
    e.preventDefault();
    var id = $(this).attr('data-id');
    $.ajax({
      type: "post",
      url: host + "api/switchSize",
      data: { id: id },
      dataType: "JSON",
      success: function (response) {
        if (response.check == true) {
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
          }).then(() => {
            window.location.reload();
          })
        } else if (response.check == false) {
          if (response.message.id) {
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
          } else if (response.message) {
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