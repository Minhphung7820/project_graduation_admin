var token = $("#token").val();
$(document).ready(function () {
    $.ajaxSetup({
        data: {
            token: token,
        },
    });
    loadBill();
    updateBill();
});
function updateBill() {
    $(".billstatus").click(function (e) {
        e.preventDefault();
        var idBill = $(this).attr("data-id");
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
    $(".rolebackbill").click(function (e) {
        e.preventDefault();
        var idBill = $(this).attr("data-id");
        $.ajax({
            type: "post",
            url: "http://127.0.0.1:3000/api/updateSttBill",
            data: { id: idBill, status: 1 },
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
    });
}
function loadBill() {
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
                    $("#resultBill").html(str);
                }
            },
        });
    });
}
