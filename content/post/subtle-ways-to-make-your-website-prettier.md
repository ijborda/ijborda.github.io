+++
author = "Imari Joy C. Borda"
title = "Subtle ways to make your website prettier"
date = "2022-06-25"
description = "Subtle ways to make a website prettier using simple lines of CSS and Javascript"
tags = [
    "web development",
    "tech",
    "guide"
]
toc = true
draft = false
+++

Sometimes, the only thing you need to make your website better looking are few CSS and JavaScript lines. Here are four simple lines of code to make your website looks prettier and smoother.

## Make scroll smoother

Add the following CSS line to make the scrolling smoother.

```css
html {
	scroll-behavior: smooth;
}
```

Site without `scroll-behavior: smooth`:
{{< youtube nJOSzCbp6K0 >}}
Site with `scroll-behavior: smooth`:
{{< youtube RYEdSnTriwY >}}

## Use CSS transition

Add the foling CSS line to enable transitions on hover. This can also be applied to other html elements like the anchor tag `a`. Transition takes three parameters:

1. Property of the element on which transiitions will be applied (all, color, width, height, etc.)
2. Duration (in milliseconds)
3. Transition effect (ease-in, ease-out, ease-in-out, ease, or a cubie-beizer funcion).

```css
button {
	transition: all 0.4s ease-in-out;
}
```

Site without transition:
{{< youtube _5GQ1rzXgD4 >}}
Site with transition:
{{< youtube KT-4WYmFJFM >}}

## Make backgrounds fixed

When I first encontered fixed-background I was amazed on how cool it is, and I thought some crazy JavaScript was involved in this. Little did I know, it only involved one CSS line!

Disclaimer: I used [the site by HTML5 UP](https://html5up.net/alpha) for this demo. Check out [their site](https://html5up.net/) for free HTML5 site templates!

```css
.background {
	background-attachment: fixed;
}
```

Site without fixed-background:
{{< youtube pQaVoDfciNI >}}
Site with fixed-background:
{{< youtube BNbLemIFchg >}}

## Use animations

For adding animations, I recommend the use the [Animation On Scroll Library](https://michalsnik.github.io/aos/) because of how easy it is to use. The set-up may be a bit involved at first, but you'll get used to it!

On you HTML head, load the library CSS:

```html
<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
```

On your HTML just before the `</body>` tag, load the library JS:

```html
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
```

On you javascript file, initializa the library:

```js
AOS.init();
```

On your element that will be animated, apply this:

```html
<div data-aos="fade-left"></div>
```

You can change the value of `data-aos` to other animation effects (fade-right, fade-up, fade-down, zoom-in, zoom-out, etc.). You could also change other settings like duration, offset, etc. See more [here](https://michalsnik.github.io/aos/).

In the demo below, I placed `data-aos="fade-right"` on the div element on the left, and `data-aos="fade-right"` on the div element on the right. This creates an effect like the two elements are closing in together when the site is loaded.

Site without animation:
{{< youtube DWLGBItyneo >}}
Site with animation:
{{< youtube t4W5kTpzaGY >}}
