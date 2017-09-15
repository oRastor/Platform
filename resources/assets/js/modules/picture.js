$(function () {
    $('body').append('<div id="picture-crop-modal" class="modal" role="dialog">' +
        '<div class="modal-dialog modal-lg">' +
            '<div class="modal-content-wrapper">' +
                '<div class="modal-content">' +
                    '<div class="modal-header clearfix text-left">' +
                        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">' +
                            '<i class="fa fa-times"></i>' +
                        '</button>' +
                        '<h5>Crop image</h5>' +
                    '</div>' +
                    '<div class="modal-body">' +
                        '<div class="upload-panel"></div>' +
                    '</div>' +
                    '<div class="modal-footer">' +
                        '<button type="button" class="btn btn-success crop">Crop</button>' +
                        '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>');
    
    var $cropPanel = $('#picture-crop-modal .upload-panel');
    var $formGroup;

    $('.picture-input-file').on('change', function () {
        $formGroup = $(this).parents('.form-group');

        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#picture-crop-modal').modal();

                $cropPanel.croppie({
                    viewport: {
                        width: $formGroup.find('.picture-path').data('width'),
                        height: $formGroup.find('.picture-path').data('height')
                    },
                    boundary: {
                        width: '100%',
                        height: 500
                    },
                    enforceBoundary: true
                });

                $cropPanel.croppie('bind', {
                    url: e.target.result
                });
            };

            reader.readAsDataURL(this.files[0]);
        }
    });

    $('.picture-action-remove').click(function() {
        var $group = $(this).parents('.form-group');

        $group.find('.picture-path').val('');
        $group.find('.picture-container').html('');

        return false;
    });

    $('#picture-crop-modal').on('hidden.bs.modal', function () {
        $cropPanel.croppie('destroy');
    });

    $('#picture-crop-modal .crop').on('click', function (ev) {
        $cropPanel.croppie('result', {
            type: 'base64',
            size: 'viewport'
        }).then(function (blob) {
            $.post('/dashboard/tools/media/upload', {
                data: blob,
                upload_path: $formGroup.find('.picture-path').data('upload-path')
            }, function (data) {
                $formGroup.find('.picture-container')
                        .html('<img src="' + data.path + '" class="img-responsive img-thumbnail" alt="" />');

                $formGroup.find('.picture-path').val(data.path);

                $('#picture-crop-modal').modal('hide');
                $formGroup.find('.picture-input-file').value = '';
            }, 'json');
        });
    });
});
