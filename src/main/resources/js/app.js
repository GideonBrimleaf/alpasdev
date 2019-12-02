window.jQuery = window.$ = require('jquery')
import Prism from 'prismjs'

jQuery(function ($) {
    // copy line numbers start offset from parent to child
    $('span.line-numbers').each(function () {
        const parent = $(this)
        parent.children('pre.line-numbers').attr('data-start', parent.attr('data-start'))
    }).promise().done(function () {
        try {
            Prism.highlightAll()
        } catch (e) {
        }
    })

    $('.docs_content blockquote p').each(function () {
        let icon, word
        const str = $(this).html()
        const match = str.match(/\/(.*?)\//)

        if (match) {
            icon = match[1] || false
            word = match[1] || false
        }

        if (icon) {
            switch (icon) {
                case "info":
                    icon = '<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-36 344h12V232h-12c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h48c6.627 0 12 5.373 12 12v140h12c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12h-72c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12zm36-240c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32z"></path></svg>'
                    break
                case "tip":
                    icon = '<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M41.8 334.14a7.998 7.998 0 0 0-2.93 10.93l8 13.86a7.998 7.998 0 0 0 10.93 2.93l99.22-57.28c-6.7-8.47-12.78-17.29-18.01-26.55L41.8 334.14zM112.33 176H8c-4.42 0-8 3.58-8 8v16c0 4.42 3.58 8 8 8h106.52c-1.63-10.52-2.17-21.23-2.19-32zM41.8 49.85l85.16 49.17c3.97-10.01 8.72-19.58 14.17-28.77L57.8 22.14a7.998 7.998 0 0 0-10.93 2.93l-8 13.86c-2.21 3.82-.9 8.71 2.93 10.92zm556.4 0a7.998 7.998 0 0 0 2.93-10.93l-8-13.86a7.998 7.998 0 0 0-10.93-2.93l-83.38 48.14C504.26 79.44 509.06 89 513.06 99l85.14-49.15zM632 176H528c0 10.8-1.25 21.45-2.9 32H632c4.42 0 8-3.58 8-8v-16c0-4.42-3.58-8-8-8zm-33.8 158.14l-97.39-56.23c-5.25 9.3-11.45 18.03-18.13 26.48l99.52 57.46c3.83 2.21 8.72.9 10.93-2.93l8-13.86c2.21-3.82.9-8.71-2.93-10.92zM320 64c-61.75 0-112 50.25-112 112 0 8.84 7.16 16 16 16s16-7.16 16-16c0-44.11 35.88-80 80-80 8.84 0 16-7.16 16-16 0-8.85-7.16-16-16-16zm0-64C217.05 0 143.88 83.54 144 176.24c.06 44.28 16.5 84.67 43.56 115.54 25.65 29.26 50.29 76.91 52.44 92.22l.06 75.18c0 3.15.94 6.22 2.68 8.84l24.51 36.84c2.97 4.46 7.97 7.14 13.32 7.14h78.85c5.36 0 10.36-2.68 13.32-7.14l24.51-36.84c1.74-2.62 2.67-5.7 2.68-8.84L400 384c2.26-15.72 26.99-63.19 52.44-92.22C479.55 260.85 496 220.37 496 176 496 78.8 417.2 0 320 0zm47.94 454.31L350.85 480h-61.71l-17.09-25.69-.01-6.31h95.9v6.31zm.04-38.31h-95.97l-.07-32h96.08l-.04 32zm60.4-145.32c-13.99 15.96-36.33 48.1-50.58 81.31H262.21c-14.26-33.22-36.59-65.35-50.58-81.31-23.13-26.38-35.5-59.84-35.58-94.68C175.87 99.01 236.43 32 320 32c79.4 0 144 64.6 144 144 0 34.85-12.65 68.48-35.62 94.68z"></path></svg>'
                    break
                case "alert":
                    icon = '<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M320 32C196.3 32 96 132.3 96 256c0 123.76 100.3 224 224 224s224-100.24 224-224c0-123.7-100.3-224-224-224zm0 416c-105.87 0-192-86.13-192-192S214.13 64 320 64s192 86.13 192 192-86.13 192-192 192zm18.64-320.02h-37.28c-7.9 0-14.08 6.82-13.29 14.69l10.69 149.29c.68 6.83 6.43 12.03 13.29 12.03h15.9c6.87 0 12.61-5.2 13.29-12.03l10.69-149.29c.79-7.86-5.39-14.69-13.29-14.69zM320 328c-13.26 0-24 10.74-24 24 0 13.25 10.74 24 24 24s24-10.75 24-24c0-13.26-10.74-24-24-24zM90.69 69.17l-12.4-10.11c-3.49-2.85-8.75-2.31-11.51 1.25C23.65 116.12 0 185.28 0 256c0 70.74 23.65 139.88 66.75 195.65 2.76 3.57 8.01 4.1 11.51 1.25l12.4-10.11c3.36-2.73 3.84-7.58 1.19-11.01C53.2 381.66 32 319.54 32 256c0-63.53 21.2-125.65 59.88-175.82 2.65-3.43 2.17-8.28-1.19-11.01zm482.53-8.86c-2.76-3.57-8.01-4.1-11.51-1.25l-12.4 10.11c-3.36 2.73-3.83 7.58-1.19 11.01C586.8 130.35 608 192.47 608 256c0 63.54-21.2 125.66-59.85 175.79-2.64 3.43-2.17 8.27 1.19 11.01l12.4 10.11c3.49 2.85 8.75 2.31 11.51-1.25C616.35 395.88 640 326.74 640 256c0-70.72-23.65-139.88-66.78-195.69z"></path></svg>'
                    break
                case "power":
                    icon = '<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M445.394 223.522L304.616 469.519c-3.522 6.654-9.943 10.481-16.623 10.481-12.266 0-21.553-12.557-18.677-25.843l36.847-166.382h-94.961c-11.6 0-20.566-11.186-19.031-23.775l25.597-213.775C219.04 39.792 227.177 32 236.8 32h108.8c12.604 0 21.8 13.087 18.552 26.411L336.458 192h92.321c14.785 0 24.011 17.55 16.615 31.522zM48 144h110.197l5.747-48H48c-26.51 0-48 21.49-48 48v224c0 26.51 21.49 48 48 48h180.604l10.63-48H48V144zm568 16h-8v-16c0-26.51-21.49-48-48-48H405.38l-9.951 48H560v64h32v96h-32v64H418.017l-27.469 48H560c26.51 0 48-21.49 48-48v-16h8c13.255 0 24-10.745 24-24V184c0-13.255-10.745-24-24-24z"></path></svg>'
                    break
            }

            $(this).html(str.replace(/\/(.*?)\//, '<div class="icon"><span class="svg">' + icon + '</span></div>'))
            $(this).addClass(word)
        }
    })
})