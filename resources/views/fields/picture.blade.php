<div class="form-group{{ $errors->has($name) ? ' has-error' : '' }}">
    @if(isset($title))
        <label for="field-{{$slug}}">{{$title}}</label>
    @endif
    <div class="picture-container" style="margin-bottom: 5px;">
        @if(isset($value) && strlen($value) || strlen(old($name)))
        <img src="{{$value or old($name)}}" class="img-responsive img-thumbnail" alt="" />
        @endif
    </div>
    <input class="picture-path" type="hidden" data-width="{{$width}}" data-height="{{$height}}" data-upload-path="{{$uploadPath or "pictures"}}"
           @if(isset($prefix))
           name="{{$prefix}}[{{$lang}}]{{$name}}"
           @else
           name="{{$lang}}{{$name}}"
           @endif
           value="{{$value or old($name)}}" />

           <div class="picture-actions">
        <label class="btn btn-info">
            Browse <input type="file" class="picture-input-file" style="display: none;">
        </label>
        <a href="#" class="btn btn-danger picture-action-remove">Remove</a>
    </div>
</div>