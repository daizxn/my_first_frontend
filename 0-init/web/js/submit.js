// 测试代码2
function $(selector){
    return document.querySelector(selector);
}

function handlePreview() {
    const uploadEl = $('#upload'); // 图片上传input
    const previewEl = $('#preview'); // 图片预览
    uploadEl.addEventListener('change', function() {
        console.log('选择文件', uploadEl.files[0]);
        const reader = new FileReader();
        reader.addEventListener('load', function() {
            console.log('显示图片');
            previewEl.src = reader.result; // 图片base64
        });
        reader.readAsDataURL(uploadEl.files[0]);
    });
}
handlePreview();

async function uploadFile() {
    const name = $("#name").value.trim();
    const photographer = $("#photographer").value.trim();
    const desc = $("#desc").value.trim();
    const fileObj = $("#upload").files[0];
    if (!fileObj) {
        alert('请选择图片');
        return;
    }

    if (!name) {
        alert('请输入名称');
        return;
    }

    if (!photographer) {
        alert('请输入拍摄者');
        return;
    }

    if (!desc) {
        alert('请输入描述信息');
        return;
    }


    const form = new FormData(); 
    form.append("file", fileObj);
    form.append("name", name);
    form.append("photographer", photographer);
    form.append("desc", desc);

    console.log('开始上传', { fileObj, name, photographer, desc });
    try {
        const response = await fetch('/data/pic/upload', {
            method: 'POST',
            body: form
        });
        console.log('状态码', response.status);

        const result = await response.json();
        if (result.success) {
            alert("上传成功！");
            window.location.href = 'index.html'
            return;
        }
    } catch (e) {
        console.error('上传失败', e);
    }
    alert("上传失败！");
}