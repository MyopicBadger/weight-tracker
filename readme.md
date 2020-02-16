# Weight tracking

A really simple web app and backend for tracking your weight.

## Rationale

Basically I've been tracking my weight via an app on my phone, but I don't really care for it, as it's a bit spammy with the adverts and whatnot. So I thought, why not implement the only bit of functionality I actually use in something standalone. Security is, within reason, mostly a non-issue as it will be running inside my vpn, so it can be a nice simple backend.

I thought I'd give writing node a go (I use it for work, but only in a quite prescribed way) and I've been meaning to get my head around the webpack business for a while, so that set the technologies I was using.

## Retrospective

Having spent the weekend working on it, I can say that while webpack was a pain to get set up at first, once it was, I could see the value, especially in a larger project where dependency management is more involved than just adding a couple of script tags. That said, I'm horrified by the megabyte of javascript that gets included in the production release -- I remember first writing javascript in the dark days before Firefox, and one of the first uses I had for it was loading the images for my carousel of images in the background to ease the pain of the ~100kb/image slideshow loading. If I were planning to spend much more time on the project, I'd probably investigate doing something about that, although I recognise it probably doesn't matter as much as my annoyance makes it feel.

Node was pretty painless -- it may or may not supplant python as my "quick idea" scripting choice, and vue was as easy to deal with as ever. The unexpected villain of the piece was Chart.js, which is the engine used to render the main graph. If it weren't for the trouble I had with that, I'd have been done yesterday. Although in fairness, it turned out it was actually my fault for passing in the wrong config. I just wish the documentation had been clearer about what the right config was.