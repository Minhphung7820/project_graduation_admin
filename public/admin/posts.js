var host = 'http://127.0.0.1:3000/';

function ChangeToSlugPosts(el) {
    var slug;

    //Lấy text từ thẻ input title 
    slug = $(el).val();
    slug = slug.toLowerCase();
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
    document.getElementById('slugPostInput').value = slug;
}
// 
function slug(el) {
    var slug;

    //Lấy text từ thẻ input title 
    slug = el.val();
    slug = slug.toLowerCase();
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
    return slug;
}
// 
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('#preview-image-before-upload').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}
$(document).ready(function() {
    $("#input-image-posts").change(function() {
        readURL(this);
    });
    $('.td-tags-posts .tags a').click(function(e) {
        e.preventDefault();
    })
    $(".td-title-posts > a").each(function(index, value) {
        $(value).click(function(e) {
            e.preventDefault();
        })
        if ($(value).text().length > 50) {
            var text = $(value).text();
            var result = text.slice(0, 50)
            $(value).text(result + "...");
        }
    })
})

function loadToPageUpdate(el) {
    window.location.href = $(el).data("url")
}
$(document).on("change", "#formFile", function(e) {
    e.preventDefault();

})
$(document).on("submit", "#form-add-posts", function(e) {
        e.preventDefault();
        $('input').removeClass('is-invalid');
        $('select').removeClass('is-invalid');
        $('textarea').removeClass('is-invalid');
        AjaxSetup()
        $.ajax({
            url: host + "api/addPosts",
            type: "post",
            data: new FormData($(this)[0]),
            contentType: false,
            cache: false,
            processData: false,
            success: function(data) {
                if (data.status == 202) {
                    $.each(data.msg, function(index, value) {
                        $('input[name="' + index + '"]').addClass('is-invalid');
                        $('select[name="' + index + '"]').addClass('is-invalid');
                        $('textarea[name="' + index + '"]').addClass('is-invalid');
                        $('.' + index).html(value);
                    })
                } else if (data.status == 204) {
                    $('input[name="slug"]').addClass('is-invalid');
                    $('.slug').html(data.msg);
                } else if (data.status == 200) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 1000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })
                    Toast.fire({
                        icon: 'success',
                        title: data.msg
                    }).then(() => {
                        window.location.reload();
                    })
                }
            }
        })
    })
    // 
$(document).on("submit", "#form-update-posts", function(e) {
    e.preventDefault();
    $('input').removeClass('is-invalid');
    $('select').removeClass('is-invalid');
    $('textarea').removeClass('is-invalid');
    AjaxSetup()
    $.ajax({
        url: host + "api/updatePosts",
        type: "post",
        data: new FormData($(this)[0]),
        contentType: false,
        cache: false,
        processData: false,
        success: function(data) {
            if (data.status == 202) {
                $.each(data.msg, function(index, value) {
                    $('input[name="' + index + '"]').addClass('is-invalid');
                    $('select[name="' + index + '"]').addClass('is-invalid');
                    $('textarea[name="' + index + '"]').addClass('is-invalid');
                    $('.' + index).html(value);
                })
            } else if (data.status == 204) {
                $('input[name="slug"]').addClass('is-invalid');
                $('.slug').html(data.msg);
            } else if (data.status == 200) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                Toast.fire({
                    icon: 'success',
                    title: data.msg
                }).then(() => {
                    window.location.href = '/edit-posts/' + data.url.slug_cate + '/' + data.url.slug_title + '.html';
                })
            }
        }
    })
})
$(document).on("click", ".btn-delete-image", function(e) {
        e.preventDefault();
        Swal.fire({
            title: 'Bạn có chắc?',
            text: "Xóa ảnh bìa tin hiện tại!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                $("#preview-image-before-upload").attr("src", 'https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png');
                $(".btn-delete-image").hide();
                AjaxSetup()
                $.ajax({
                    url: host + "api/deleteImageCoverPosts",
                    type: "post",
                    data: {
                        token: $(this).data("token"),
                        id: $(this).data("id"),
                    },
                    success: function(data) {
                        if (data.status == 200) {
                            console.log("XÓA THÀNH CÔNG");
                        }
                    }
                });
                // Swal.fire(
                //     'Deleted!',
                //     'Your file has been deleted.',
                //     'success'
                // )
            }
        })

    })
    //=======================================================
$(document).on("change", "#checkbox-all-posts", function(e) {
        e.preventDefault();
        $(".checkbox-each-posts").prop("checked", $(this).prop("checked"));
        $(".btn-move-more-item-ton-trash").show();
        $("#count-item-move-to-trash").html($('input[class="checkbox-each-posts"]:checked').length);
        if ($('input[class="checkbox-each-posts"]:checked').length == 0) {
            $(".btn-move-more-item-ton-trash").hide();
        }
    })
    //=======================================================
$(document).on("change", ".checkbox-each-posts", function(e) {
        e.preventDefault();
        if ($('input[class="checkbox-each-posts"]:checked').length == $('input[class="checkbox-each-posts"]').length) {
            $("#checkbox-all-posts").prop("checked", true);
        } else {
            $("#checkbox-all-posts").prop("checked", false);
        }
        $(".btn-move-more-item-ton-trash").show();
        $("#count-item-move-to-trash").html($('input[class="checkbox-each-posts"]:checked').length);
        if ($('input[class="checkbox-each-posts"]:checked').length == 0) {
            $(".btn-move-more-item-ton-trash").hide();
        }
    })
    //=======================================================
$(document).on("click", ".btn-move-more-item-ton-trash", function(e) {
    e.preventDefault();
    var arrDelete = [];
    $('input[class="checkbox-each-posts"]:checked').each(function(index, value) {
        arrDelete.push($(value).data("id"))
    })
    Swal.fire({
        title: 'Bạn có chắc?',
        text: "Bạn có muốn chuyển " + $('input[class="checkbox-each-posts"]:checked').length + " mục đã chọn vào thùng rác ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK'
    }).then((result) => {
        if (result.isConfirmed) {
            AjaxSetup()
            $.ajax({
                    url: host + "api/deleteSoftManyPosts",
                    type: "post",
                    data: {
                        token: $("#token").val(),
                        arr: arrDelete
                    },
                    success: function(data) {
                        if (data.status == 200) {
                            const Toast = Swal.mixin({
                                toast: true,
                                position: 'top-end',
                                showConfirmButton: false,
                                timer: 1000,
                                timerProgressBar: true,
                                didOpen: (toast) => {
                                    toast.addEventListener('mouseenter', Swal.stopTimer)
                                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                                }
                            })
                            Toast.fire({
                                icon: 'success',
                                title: "Đã chuyển vào thùng rác !"
                            }).then(() => {
                                window.location.reload();
                            })
                        }
                    }
                })
                // Swal.fire(
                //     'Deleted!',
                //     'Your file has been deleted.',
                //     'success'
                // )
        }
    })
})
$(document).on("click", ".btn-action-in-trash", function(e) {
        e.preventDefault();
        $(this).css('background', 'none');
    })
    // 
$(document).on("change", "#check-all-trash-posts", function(e) {
        e.preventDefault();
        $(".check-each-posts-in-trash").prop("checked", $(this).prop("checked"));
        $(".btn-action-when-checkbox-in-trash").show();
        $(".count-item-checkked-in-trash").html($('input[class="check-each-posts-in-trash"]:checked').length)
        if ($('input[class="check-each-posts-in-trash"]:checked').length == 0) {
            $(".btn-action-when-checkbox-in-trash").hide();
        }
    })
    // 
$(document).on("change", ".check-each-posts-in-trash", function(e) {
        e.preventDefault();
        if ($('input[class="check-each-posts-in-trash"]:checked').length == $('input[class="check-each-posts-in-trash"]').length) {
            $("#check-all-trash-posts").prop("checked", true);
        } else {
            $("#check-all-trash-posts").prop("checked", false);
        }
        $(".btn-action-when-checkbox-in-trash").show();
        $(".count-item-checkked-in-trash").html($('input[class="check-each-posts-in-trash"]:checked').length);
        if ($('input[class="check-each-posts-in-trash"]:checked').length == 0) {
            $(".btn-action-when-checkbox-in-trash").hide();
        }
    })
    //
$(document).on("click", ".btn-restore-many-posts-trash", function(e) {
        e.preventDefault();
        var arrRestore = [];
        $('input[class="check-each-posts-in-trash"]:checked').each(function(index, value) {
            arrRestore.push($(value).data("id"));
        })
        AjaxSetup();
        $.ajax({
            url: host + "api/restoreManyPosts",
            type: "post",
            data: {
                token: $("#token").val(),
                arr: arrRestore,
            },
            success: function(data) {
                if (data.status == 200) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 1000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })
                    Toast.fire({
                        icon: 'success',
                        title: "Đã khôi phục thành công !"
                    }).then(() => {
                        window.location.reload();
                    })
                }
            }
        })
    })
    // 

$(document).on("click", ".btn-move-to-trash-single-posts", function(e) {
        e.preventDefault();
        // alert($(this).data("id"))
        AjaxSetup();
        $.ajax({
            url: host + "api/deleteSoftSinglePosts",
            type: "post",
            data: {
                token: $("#token").val(),
                id: $(this).data("id"),
            },
            success: function(data) {
                if (data.status == 200) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 1000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })
                    Toast.fire({
                        icon: 'success',
                        title: "Đã chuyển vào thùng rác !"
                    }).then(() => {
                        window.location.reload();
                    })
                }
            }
        })
    })
    // 
$(document).on("dblclick", ".td-title-posts", function(e) {
    e.preventDefault();
    $('.td-title-posts > a[class="a-' + $(this).data("id") + '"]').hide();
    $('#form-change-title-posts-fast' + $(this).data("id")).show();
    $("#btn-submit-update-fast-title" + $(this).data("id")).hide();
})
$(document).on("keyup", ".textarea-update-fast-title", function(e) {
        e.preventDefault();
        if ($(this).val().trim() != $("#title-current-posts" + $(this).data("id")).val()) {
            $("#btn-submit-update-fast-title" + $(this).data("id")).show();
        } else {
            $("#btn-submit-update-fast-title" + $(this).data("id")).hide();
        }
    })
    // 
$(document).on("click", ".btn-submit-update-fast-title", function(e) {
        e.preventDefault();
        if ($("#textarea-update-fast-title-" + $(this).data("id")).val().trim() == "") {
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
                title: "Vui lòng nhập tiêu đề !"
            })
            return false;
        } else {
            AjaxSetup();
            $.ajax({
                url: host + "api/changeFastTitlePosts",
                type: "post",
                data: {
                    token: $("#token").val(),
                    id: $(this).data("id"),
                    slug: slug($("#textarea-update-fast-title-" + $(this).data("id"))),
                    title: $("#textarea-update-fast-title-" + $(this).data("id")).val().trim()
                },
                success: function(data) {
                    if (data.status == 202) {
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
                            title: data.msg
                        })
                        return false;
                    } else if (data.status == 200) {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 1000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        })
                        Toast.fire({
                            icon: 'success',
                            title: "Đã cập nhật tiêu đề !"
                        }).then(() => {
                            // window.location.reload();
                        })
                        $("#form-change-title-posts-fast" + data.id).hide();
                        $('.td-title-posts > a[class="a-' + data.id + '"]').show();
                        $("#title-current-posts" + data.id).val(data.title);
                        $('#textarea-update-fast-title-' + data.id).val(data.title);
                        $("#btn-load-to-page-update-post-by-" + data.id).data("url", "/edit-posts/" + data.slug_cate + "/" + data.slug_title + ".html");
                        if (data.title.length > 50) {
                            var textN = data.title;
                            var resultN = textN.slice(0, 50)
                            $('.td-title-posts > a[class="a-' + data.id + '"]').text(resultN + "...");
                        } else {
                            $('.td-title-posts > a[class="a-' + data.id + '"]').text(data.title.trim());
                        }
                    }
                }
            })
        }

    })
    // 

$(document).on("click", ".btn-change-fast-status-posts", function(e) {
        e.preventDefault();
        AjaxSetup();
        $.ajax({
            url: host + "api/changeFastStatusPosts",
            type: "post",
            data: {
                token: $("#token").val(),
                id: $(this).data("id"),
                act: $(this).data("act"),
            },
            success: function(data) {
                if (data.status == 200) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 1000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })
                    Toast.fire({
                        icon: 'success',
                        title: "Đã thay đổi trạng thái !"
                    }).then(() => {
                        window.location.reload();
                    })
                }
            }
        })
    })
    // 
$(document).on("click", ".btn-force-delete-many-posts-trash", function(e) {
        e.preventDefault();
        var arrDeleteForce = [];
        $('input[class="check-each-posts-in-trash"]:checked').each(function(index, value) {
            arrDeleteForce.push($(value).data("id"))
        })
        Swal.fire({
            title: 'Bạn có chắc?',
            text: "Bạn có muốn xóa vĩnh viễn " + $('input[class="check-each-posts-in-trash"]:checked').length + " bài viết này ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                AjaxSetup();
                $.ajax({
                    url: host + "api/forceDeleteManyPosts",
                    type: "post",
                    data: {
                        token: $("#token").val(),
                        arr: arrDeleteForce
                    },
                    success: function(data) {
                        if (data.status == 200) {
                            const Toast = Swal.mixin({
                                toast: true,
                                position: 'top-end',
                                showConfirmButton: false,
                                timer: 1000,
                                timerProgressBar: true,
                                didOpen: (toast) => {
                                    toast.addEventListener('mouseenter', Swal.stopTimer)
                                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                                }
                            })
                            Toast.fire({
                                icon: 'success',
                                title: "Đã xóa thành công !"
                            }).then(() => {
                                window.location.reload();
                            })
                        }
                    }
                })
            }
        })
    })
    // 

$(document).on("click", ".btn-restore-single-posts-trash", function(e) {
        e.preventDefault();

        AjaxSetup();
        $.ajax({
            url: host + "api/restoreSinglePosts",
            type: "post",
            data: {
                token: $("#token").val(),
                id: $(this).data("id"),
            },
            success: function(data) {
                if (data.status == 200) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 1000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })
                    Toast.fire({
                        icon: 'success',
                        title: "Đã khôi phục thành công !"
                    }).then(() => {
                        window.location.reload();
                    })
                }
            }
        })
    })
    // 

$(document).on("click", ".btn-force-delete-single-posts-trash", function(e) {
        e.preventDefault();
        Swal.fire({
            title: 'Bạn có chắc?',
            text: "Bạn có muốn xóa vĩnh viễn bài viết này ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                AjaxSetup();
                $.ajax({
                    url: host + "api/forceDeleteSinglePosts",
                    type: "post",
                    data: {
                        token: $("#token").val(),
                        id: $(this).data("id")
                    },
                    success: function(data) {
                        if (data.status == 200) {
                            const Toast = Swal.mixin({
                                toast: true,
                                position: 'top-end',
                                showConfirmButton: false,
                                timer: 1000,
                                timerProgressBar: true,
                                didOpen: (toast) => {
                                    toast.addEventListener('mouseenter', Swal.stopTimer)
                                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                                }
                            })
                            Toast.fire({
                                icon: 'success',
                                title: "Đã xóa thành công !"
                            }).then(() => {
                                window.location.reload();
                            })
                        }
                    }
                })
            }
        })
    })
    // 
$(document).on("click", ".btn-canncel-update-fast-title", function(e) {
    e.preventDefault();
    $("#form-change-title-posts-fast" + $(this).data("id")).hide();
    $('.td-title-posts > a[class="a-' + $(this).data("id") + '"]').show();
    $("#textarea-update-fast-title-" + $(this).data("id")).val($('#title-current-posts' + $(this).data("id")).val());
})

// =============================================
$(document).on("change", ".input-check-prod-in-posts", function(e) {
        e.preventDefault();
        if ($('input[class="input-check-prod-in-posts"]:checked').length > 0) {
            $(".btn-add-prod-in-add-posts").removeClass("btn-danger");
            $(".btn-add-prod-in-add-posts").addClass("btn-success");
            $(".btn-add-prod-in-add-posts").html("Có " + $('input[class="input-check-prod-in-posts"]:checked').length + " sản phẩm được chọn");
        } else {
            $(".btn-add-prod-in-add-posts").addClass("btn-danger");
            $(".btn-add-prod-in-add-posts").removeClass("btn-success");
            $(".btn-add-prod-in-add-posts").html("+ Các sản phẩm liên quan đến bài viết");
        }
    })
    // ==============================================

$(document).on("change", ".input-check-prod-in-edit-posts", function(e) {
    e.preventDefault();
    if ($('input[class="input-check-prod-in-edit-posts"]:checked').length > 0) {
        $(".btn-add-prod-in-edit-posts").removeClass("btn-danger");
        $(".btn-add-prod-in-edit-posts").addClass("btn-success");
        $(".btn-add-prod-in-edit-posts").html("Có " + $('input[class="input-check-prod-in-edit-posts"]:checked').length + " sản phẩm được chọn");
    } else {
        $(".btn-add-prod-in-edit-posts").addClass("btn-danger");
        $(".btn-add-prod-in-edit-posts").removeClass("btn-success");
        $(".btn-add-prod-in-edit-posts").html("+ Các sản phẩm liên quan đến bài viết");
    }
})