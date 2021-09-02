$(function() {
    const pasteKanji = document.querySelectorAll('.name-kanji')
    pasteKanji.forEach(input => {
        input.addEventListener('paste', e => {
            const data = e.clipboardData.items[0];
            if(data.kind == 'string' && data.type == 'text/plain') {
                data.getAsString(str => {
                    // console.log('string input', str)
                    let name = $("#name-kanji")[0]
                    let kana = $("#name-kana")[0]
                    $.fn.autoKana(name, kana,{ katakana : true })
                    // let tmp = $.fn.autoKana('input[name="name"] ', 'input[name="name_kana"]', {katakana: true});　//name属性で判別する場合
                    // console.log('paste kanji', tmp)
                });
            }
        });
    })
    $.fn.autoKana('input[name="name"] ', 'input[name="name_kana"]', {katakana:true});　//name属性で判別する場合
});
document.addEventListener('DOMContentLoaded', () => {
    const pasteMes = document.querySelectorAll('.paste-me');
    pasteMes.forEach(input => {
        input.addEventListener('paste', e => {
            const data = e.clipboardData.items[0];
            if(data.kind == 'string' && data.type == 'text/plain') {
                data.getAsString(str => {
                    // Format string as mobile
                    str = formatTelNumber(str)
                    str.split(/\s/).forEach((v, ind) => {
                        pasteMes[ind] && (pasteMes[ind].value = v || '');
                    })
                });
            }
        });
    });
});
function fillInputTel() {
    const pasteMes = document.querySelectorAll('.paste-me');
    pasteMes.forEach(input => {
        let tel1 = $("#tel-1")[0].value
        tel1 = formatTelNumber(tel1)
        tel1.split(/\s/).forEach((v, ind) => {
            pasteMes[ind] && (pasteMes[ind].value = v || '');
        })
    })
}
function testFunction() {

}
function formatTelNumber(tel) {
    if (tel.length === 11) {
        tel = tel.replace(/\D*(\d{4})\D*(\d{3})\D*(\d{4})\D*/, '$1 $2 $3')
    } else {
        tel = tel.replace(/\D*(\d{4})\D*(\d{2})\D*(\d{4})\D*/, '$1 $2 $3')
    }
    if (tel.includes('-')) {
        tel = tel.replaceAll('-', ' ')
    }
    return tel
}
function save () {
    let name = document.getElementById('name-kanji').value
    let nameKana = document.getElementById('name-kana').value
    let tel = ''
    document.querySelectorAll('.paste-me').forEach(input => {
        tel = $("#tel-1")[0].value + '-' + $("#tel-2")[0].value + '-' + $("#tel-3")[0].value
    })
    localStorage.setItem('name', name)
    localStorage.setItem('kana', nameKana)
    localStorage.setItem('tel', tel)
    return false
}
$(document).ready(function(){
    $('input').keyup(function(){
        console.log('vao day khong', $(this))
        if($(this).val().length==$(this).attr("maxlength")){
            $(this).next().next().focus();
        }
    });
    if ($("#tel-1")[0].value || $("#tel-2")[0].value || $("#tel-3")[0].value) {
        document.getElementById('telInput').innerHTML = $("#tel-1")[0].value + '-' + $("#tel-2")[0].value + '-' + $("#tel-3")[0].value
    }
});
