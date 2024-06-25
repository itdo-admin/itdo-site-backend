-- migrate:up
INSERT INTO public.projects (title, description, summary, photo, color) VALUES ('Просто пироги', '<h1>Решения</h1><h2>Prostopirogi</h2><p>С самого начала “Просто пироги” были написаны на движке <a href="https://wordpress.org/">Wordpress</a> с использованием плагина <a href="https://woocommerce.com/">woocommerce</a>. Данное решение оказалось тяжеловольным и плохо расширяемым.</p><p>Было принято решение о новом сайте. Мы в свою очередь предложили решение, которое потом как оказалось используется в Яндексе, называется - <a href="https://habr.com/ru/companies/yandex/articles/514550/">BFF</a>.</p><p>Мы взяли данное решение и применили его у себя. В итоге у нас на backend''е использовалась <a href="https://www.scala-lang.org/">Scala</a>, а на frontend''е - <a href="https://nodejs.org/">nodejs</a>. Что дало нам хорошую расширяемость, заменяемость компонентов и производительность.</p><p><strong>Стек:</strong> Scala, nodejs, koa, Typescript</p>', 'Сайт по доставке пирогов с информационной панелью и системой доставки', '{/public/pie-logo.png,/public/pie-cropped.png,/public/pie-logo.png}', '#F39200');
INSERT INTO public.projects (title, description, summary, photo, color) VALUES ('Орехово-Борисово Южное', e'Информационный сайт муниципалитета.
Разработка сайта и дизайна', e'Информационный сайт муниципалитета.
Разработка сайта и дизайна', '{/public/mo-logo.png}', '#FECC00');
INSERT INTO public.projects (title, description, summary, photo, color) VALUES ('ГБУ Чертаново северное', 'Информационный сайт с целью оповещения событий в районе и городе', 'Информационный сайт с целью оповещения событий в районе и городе', '{/public/chs-logo.png}', '#215FAA');
INSERT INTO public.projects (title, description, summary, photo, color) VALUES ('Самсклад', 'Сайт для бизнеса: “Центр хранения личных вещей”', 'Сайт для бизнеса: “Центр хранения личных вещей”', '{/public/samsklad-logo.png}', '#3757AF');

-- migrate:down
DELETE FROM public.projects WHERE title = 'Просто пироги';
DELETE FROM public.projects WHERE title = 'Орехово-Борисово Южное';
DELETE FROM public.projects WHERE title = 'ГБУ Чертаново северное';
DELETE FROM public.projects WHERE title = 'Самсклад';
