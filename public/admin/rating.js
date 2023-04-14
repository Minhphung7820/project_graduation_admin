const uri = new URL(window.location.href);
$(document).ready(function() {
        if (uri.searchParams.has('m') && !uri.searchParams.has('sort-by')) {
            viewMoreRatingWhenReload(uri.searchParams.get('m'))
        } else if (!uri.searchParams.has("m") && uri.searchParams.has("sort-by")) {
            filterRating(uri.searchParams.get("sort-by"))
        } else if (uri.searchParams.has('m') && uri.searchParams.has('sort-by')) {
            viewMoreRatingByFilterWhenReload(uri.searchParams.get("sort-by"), uri.searchParams.get('m'))
        } else {
            loadDataRating()
        }

    })
    // ================================
function loadDataRating() {
    const urlCurrent = new URL(window.location.href);
    const minCurrent = urlCurrent.searchParams.get("m");
    const sortby = urlCurrent.searchParams.get("sort-by");

    AjaxSetup();
    $.ajax({
        url: "/loadListRating",
        type: "get",
        success: function(data) {
            // ================ Xử lý hành động==================
            // ############
            $(".box-all-rating-customer").html(data);
            if (urlCurrent.searchParams.has("sort-by")) {
                $('.select-filter-rating-prod  option[value="' + urlCurrent.searchParams.has("sort-by") + '"]').attr('selected', 'selected');
                $('.select-filter-rating-prod').val(urlCurrent.searchParams.has("sort-by"));
            }
            // 

            $(".btn-action-rating-customer > a").css({
                    'text-decoration': 'none'
                })
                // #############
            $(".row-rating-box-of-customer").each(function(index, value) {
                $(".main_star_" + $(value).data("id")).each(function(i, v) {
                    if ($(value).data("stars") >= i + 1) {
                        $(v).addClass("text-warning");
                    } else {
                        $(v).addClass("star-light")
                    }
                })

            })
            $(".row-rating-box-of-customer").click(function(e) {
                e.preventDefault();
                if ($(this).hasClass("checked-rating")) {
                    $(this).removeClass("checked-rating");
                } else {
                    $(this).addClass("checked-rating");
                }

                if ($(".checked-rating").length > 0) {
                    $(".select-action-rating-prod").prop("disabled", false);
                    $(".btn-apply-action-rating").show(500)
                } else {
                    $(".select-action-rating-prod").prop("disabled", true);
                    $(".btn-apply-action-rating").hide(500)
                }

            })
            $(".btn-apply-action-rating").click(function(e) {
                e.preventDefault();
                var ids = [];
                var act = $(".select-action-rating-prod").val();
                $(".checked-rating").each(function(index, value) {
                    ids.push($(value).data("id"));
                })
                actionRating(ids, act)

            })

            $(".btn-viewmore-rating-admin").click(function(e) {
                e.preventDefault();
                var idMin = $(this).data("idmin");
                console.log(idMin);
                window.history.pushState({}, "", "?m=" + idMin);
                const urls = new URL(window.location.href);
                const min = urls.searchParams.get("m");
                viewmoreRating(min)
            })

            $(".select-filter-rating-prod").change(function(e) {
                e.preventDefault();
                var valueSortBy = $(this).val();
                window.history.pushState({}, "", "?sort-by=" + valueSortBy);
                const urls_2 = new URL(window.location.href);
                const sortbyV = urls_2.searchParams.get("sort-by");
                filterRating(sortbyV)
            })

            // ====================== Kết thúc xử lý hành động==============================
        }
    })











}

function actionRating(arr = [], action) {
    if (action == "") {
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
            icon: 'error',
            title: "Vui lòng chọn hành động !"
        })
        return false;
    } else {
        Swal.fire({
            title: 'Bạn có chắc?',
            text: "Bạn có chắc áp dụng các hành động này !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                AjaxSetup();
                $.ajax({
                    url: "/actionRating",
                    type: "post",
                    data: {
                        arr: arr,
                        action: action,
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
                                title: data.msg
                            }).then(() => {
                                const uris = new URL(window.location.href);
                                if (uris.searchParams.has('m') && !uris.searchParams.has('sort-by')) {
                                    viewMoreRatingWhenReload(uris.searchParams.get('m'))
                                } else if (!uris.searchParams.has("m") && uris.searchParams.has("sort-by")) {
                                    filterRating(uris.searchParams.get("sort-by"))
                                } else if (uris.searchParams.has("m") && uris.searchParams.has("sort-by")) {
                                    viewMoreRatingByFilterWhenReload(uris.searchParams.get("sort-by"), uris.searchParams.get('m'))
                                } else {
                                    loadDataRating()
                                }
                            })
                        }
                    }
                })
            }
        })
    }
}

function viewMoreRatingWhenReload(idmin) {
    AjaxSetup();
    $.ajax({
        url: '/viewMoreRatingWhenReload/' + idmin,
        type: "get",
        success: function(data) {
            $(".box-all-rating-customer").html(data)
            $(".btn-action-rating-customer > a").css({
                'text-decoration': 'none'
            })
            $(".row-rating-box-of-customer").click(function(e) {
                e.preventDefault();
                if ($(this).hasClass("checked-rating")) {
                    $(this).removeClass("checked-rating");
                } else {
                    $(this).addClass("checked-rating");
                }

                if ($(".checked-rating").length > 0) {
                    $(".select-action-rating-prod").prop("disabled", false);
                    $(".btn-apply-action-rating").show(500)
                } else {
                    $(".select-action-rating-prod").prop("disabled", true);
                    $(".btn-apply-action-rating").hide(500)
                }

            })
            $(".row-rating-box-of-customer").each(function(index, value) {
                $(".main_star_" + $(value).data("id")).each(function(i, v) {
                    if ($(value).data("stars") >= i + 1) {
                        $(v).addClass("text-warning");
                    } else {
                        $(v).addClass("star-light")
                    }
                })

            })
            $(".btn-viewmore-rating-admin").click(function(e) {
                e.preventDefault();
                var idMins = $(this).data("idmin");
                window.history.pushState({}, "", "?m=" + idMins);
                const urlss = new URL(window.location.href);
                const mins = urlss.searchParams.get("m");
                viewmoreRating(mins)

            })
            $(".btn-apply-action-rating").click(function(e) {
                e.preventDefault();
                var ids = [];
                var act = $(".select-action-rating-prod").val();
                $(".checked-rating").each(function(index, value) {
                    ids.push($(value).data("id"));
                })
                actionRating(ids, act)

            })
            $(".select-filter-rating-prod").change(function(e) {
                e.preventDefault();
                var valueSortBy = $(this).val();
                window.history.pushState({}, "", "?sort-by=" + valueSortBy);
                const urlss = new URL(window.location.href);
                filterRating(urlss.searchParams.get("sort-by"))
            })
        }
    })
}

function viewmoreRating(idmin) {
    $(".row-rating-box-of-customer").click(function(e) {
        e.preventDefault();
        if ($(this).hasClass("checked-rating")) {
            $(this).removeClass("checked-rating");
        } else {
            $(this).addClass("checked-rating");
        }

        if ($(".checked-rating").length > 0) {
            $(".select-action-rating-prod").prop("disabled", false);
            $(".btn-apply-action-rating").show(500)
        } else {
            $(".select-action-rating-prod").prop("disabled", true);
            $(".btn-apply-action-rating").hide(500)
        }

    })
    AjaxSetup();
    $.ajax({
        url: "/viewMoreRating/" + idmin,
        type: "get",
        success: function(data) {
            $(".box-btn-view-more-rating").remove();
            $(".box-all-rating-customer").append(data)
            $(".btn-action-rating-customer > a").css({
                'text-decoration': 'none'
            })
            $(".row-rating-box-of-customer").click(function(e) {
                e.preventDefault();
                if ($(this).hasClass("checked-rating")) {
                    $(this).removeClass("checked-rating");
                } else {
                    $(this).addClass("checked-rating");
                }

                if ($(".checked-rating").length > 0) {
                    $(".select-action-rating-prod").prop("disabled", false);
                    $(".btn-apply-action-rating").show(500)
                } else {
                    $(".select-action-rating-prod").prop("disabled", true);
                    $(".btn-apply-action-rating").hide(500)
                }

            })
            $(".row-rating-box-of-customer").each(function(index, value) {
                $(".main_star_" + $(value).data("id")).each(function(i, v) {
                    if ($(value).data("stars") >= i + 1) {
                        $(v).addClass("text-warning");
                    } else {
                        $(v).addClass("star-light")
                    }
                })

            })
            $(".btn-viewmore-rating-admin").click(function(e) {
                e.preventDefault();
                var idMins = $(this).data("idmin");
                window.history.pushState({}, "", "?m=" + idMins);
                const urlss = new URL(window.location.href);
                const mins = urlss.searchParams.get("m");
                viewmoreRating(mins)

            })
            $(".btn-apply-action-rating").click(function(e) {
                e.preventDefault();
                var ids = [];
                var act = $(".select-action-rating-prod").val();
                $(".checked-rating").each(function(index, value) {
                    ids.push($(value).data("id"));
                })
                actionRating(ids, act)

            })
        }
    })
}
// ===========================================
function filterRating(sortby) {
    AjaxSetup();
    $.ajax({
        url: "/filterRatingByStatus/" + sortby,
        type: "get",
        success: function(data) {
            $(".box-all-rating-customer").html(data);
            $(".btn-action-rating-customer > a").css({
                'text-decoration': 'none'
            })
            $('.select-filter-rating-prod  option[value="' + sortby + '"]').attr('selected', 'selected');
            $('.select-filter-rating-prod').val(sortby);

            $(".row-rating-box-of-customer").each(function(index, value) {
                $(".main_star_" + $(value).data("id")).each(function(i, v) {
                    if ($(value).data("stars") >= i + 1) {
                        $(v).addClass("text-warning");
                    } else {
                        $(v).addClass("star-light")
                    }
                })

            })
            $(".row-rating-box-of-customer").click(function(e) {
                e.preventDefault();
                if ($(this).hasClass("checked-rating")) {
                    $(this).removeClass("checked-rating");
                } else {
                    $(this).addClass("checked-rating");
                }

                if ($(".checked-rating").length > 0) {
                    $(".select-action-rating-prod").prop("disabled", false);
                    $(".btn-apply-action-rating").show(500)
                } else {
                    $(".select-action-rating-prod").prop("disabled", true);
                    $(".btn-apply-action-rating").hide(500)
                }

            })
            $(".btn-apply-action-rating").click(function(e) {
                e.preventDefault();
                var ids = [];
                var act = $(".select-action-rating-prod").val();
                $(".checked-rating").each(function(index, value) {
                    ids.push($(value).data("id"));
                })
                actionRating(ids, act)

            })

            $(".btn-viewmore-rating-admin-by-filter").click(function(e) {
                e.preventDefault();
                var idMin = $(this).data("idmin");
                const urls = new URL(window.location.href);
                window.history.pushState({}, "", "?sort-by=" + urls.searchParams.get("sort-by") + "&m=" + idMin);
                const sorts = urls.searchParams.get("sort-by");
                const mins = urls.searchParams.get("m");
                viewMoreRatingByFilter(sorts, idMin)


            })

            $(".select-filter-rating-prod").change(function(e) {
                e.preventDefault();
                var valueSortBy = $(this).val();
                window.history.pushState({}, "", "?sort-by=" + valueSortBy);
                const urls_2 = new URL(window.location.href);
                const sortbyV = urls_2.searchParams.get("sort-by");
                filterRating(sortbyV)
            })
        }
    })
}

function viewMoreRatingByFilter(params, params2) {
    $(".row-rating-box-of-customer").click(function(e) {
        e.preventDefault();
        if ($(this).hasClass("checked-rating")) {
            $(this).removeClass("checked-rating");
        } else {
            $(this).addClass("checked-rating");
        }

        if ($(".checked-rating").length > 0) {
            $(".select-action-rating-prod").prop("disabled", false);
            $(".btn-apply-action-rating").show(500)
        } else {
            $(".select-action-rating-prod").prop("disabled", true);
            $(".btn-apply-action-rating").hide(500)
        }

    })
    AjaxSetup();
    $.ajax({
        url: "/viewMoreFilterRating/" + params + "/" + params2,
        type: "get",
        success: function(response) {
            $(".box-btn-view-more-rating-by-filter").remove();
            $(".box-all-rating-customer").append(response);
            $(".btn-action-rating-customer > a").css({
                'text-decoration': 'none'
            })
            $(".row-rating-box-of-customer").click(function(e) {
                e.preventDefault();
                if ($(this).hasClass("checked-rating")) {
                    $(this).removeClass("checked-rating");
                } else {
                    $(this).addClass("checked-rating");
                }

                if ($(".checked-rating").length > 0) {
                    $(".select-action-rating-prod").prop("disabled", false);
                    $(".btn-apply-action-rating").show(500)
                } else {
                    $(".select-action-rating-prod").prop("disabled", true);
                    $(".btn-apply-action-rating").hide(500)
                }

            })
            $(".row-rating-box-of-customer").each(function(index, value) {
                $(".main_star_" + $(value).data("id")).each(function(i, v) {
                    if ($(value).data("stars") >= i + 1) {
                        $(v).addClass("text-warning");
                    } else {
                        $(v).addClass("star-light")
                    }
                })

            })
            $(".btn-viewmore-rating-admin-by-filter").click(function(e) {
                e.preventDefault();
                var idMins = $(this).data("idmin");
                var stt = $(this).data("stt");
                window.history.pushState({}, "", "?sort-by=" + stt + "&m=" + idMins);
                const urlss = new URL(window.location.href);
                viewMoreRatingByFilter(urlss.searchParams.get("sort-by"), urlss.searchParams.get("m"));

            })
            $(".btn-apply-action-rating").click(function(e) {
                e.preventDefault();
                var ids = [];
                var act = $(".select-action-rating-prod").val();
                $(".checked-rating").each(function(index, value) {
                    ids.push($(value).data("id"));
                })
                actionRating(ids, act)

            })
        }
    })
}
// ==============================================
function viewMoreRatingByFilterWhenReload(sortby, id) {
    AjaxSetup();
    $.ajax({
        url: "/viewMoreRatingByFilterWhenReload/" + sortby + "/" + id,
        type: "get",
        success: function(data) {
            $(".box-all-rating-customer").html(data)
            $(".btn-action-rating-customer > a").css({
                'text-decoration': 'none'
            })
            $('.select-filter-rating-prod  option[value="' + sortby + '"]').attr('selected', 'selected');
            $('.select-filter-rating-prod').val(sortby);
            $(".row-rating-box-of-customer").click(function(e) {
                e.preventDefault();
                if ($(this).hasClass("checked-rating")) {
                    $(this).removeClass("checked-rating");
                } else {
                    $(this).addClass("checked-rating");
                }

                if ($(".checked-rating").length > 0) {
                    $(".select-action-rating-prod").prop("disabled", false);
                    $(".btn-apply-action-rating").show(500)
                } else {
                    $(".select-action-rating-prod").prop("disabled", true);
                    $(".btn-apply-action-rating").hide(500)
                }

            })
            $(".row-rating-box-of-customer").each(function(index, value) {
                $(".main_star_" + $(value).data("id")).each(function(i, v) {
                    if ($(value).data("stars") >= i + 1) {
                        $(v).addClass("text-warning");
                    } else {
                        $(v).addClass("star-light")
                    }
                })

            })
            $(".btn-viewmore-rating-admin-by-filter").click(function(e) {
                e.preventDefault();
                var idMins = $(this).data("idmin");
                var stt = $(this).data("stt");
                window.history.pushState({}, "", "?sort-by=" + stt + "&m=" + idMins);
                const urlss = new URL(window.location.href);
                viewMoreRatingByFilter(urlss.searchParams.get("sort-by"), urlss.searchParams.get("m"));

            })
            $(".btn-apply-action-rating").click(function(e) {
                e.preventDefault();
                var ids = [];
                var act = $(".select-action-rating-prod").val();
                $(".checked-rating").each(function(index, value) {
                    ids.push($(value).data("id"));
                })
                actionRating(ids, act)

            })
            $(".select-filter-rating-prod").change(function(e) {
                e.preventDefault();
                var valueSortBy = $(this).val();
                window.history.pushState({}, "", "?sort-by=" + valueSortBy);
                const urlss = new URL(window.location.href);
                filterRating(urlss.searchParams.get("sort-by"))
            })
        }
    })
}