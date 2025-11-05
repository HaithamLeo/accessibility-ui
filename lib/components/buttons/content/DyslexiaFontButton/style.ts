const DYSLEXIA_FONT_STYLE = `
 @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@300;400;700&display=swap');

@font-face {
    font-family: 'OpenDyslexic';
    src: url('https://cdn.jsdelivr.net/npm/open-dyslexic@1.0.3/otf/OpenDyslexic-Bold.otf') format('opentype');
    font-weight: bold;
    font-style: normal;
}

@font-face {
    font-family: 'OpenDyslexic';
    src: url('https://cdn.jsdelivr.net/npm/open-dyslexic@1.0.3/otf/OpenDyslexic-Regular.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
}

html{
    font-family: OpenDyslexic,Comic Neue,Arial,Helvetica,sans-serif !important
  
}

html *, *{
    font-family: OpenDyslexic,Comic Neue,Arial,Helvetica,sans-serif !important
}

html.a11y-font-weight{
    font-family: OpenDyslexic,Comic Neue,Arial,Helvetica,sans-serif !important 
}


`

export default DYSLEXIA_FONT_STYLE
