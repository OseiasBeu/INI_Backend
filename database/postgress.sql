
#Usu�rios
CREATE TABLE public.usuarios(
	id serial PRIMARY KEY,
	email VARCHAR ( 200 ) UNIQUE NOT NULL,
	senha VARCHAR ( 200 ) NOT NULL
);

insert into usuarios (email, senha) values('suporte@gmail.com', '$2b$10$6ZbT4sKq5St91o5bgpJpReNDHci.a3lQ18ObJAE97ljgApqFLyvNW');

SELECT id, email, senha FROM public.usuarios;


#Categorias
CREATE TABLE public.categorias(
	id serial PRIMARY key not null,
	descricao VARCHAR ( 200 ) NOT NULL,
	cor VARCHAR ( 9 ) NOT NULL
);


insert into categorias (descricao, cor) values
  ( 'Pessoal', '#27AE60'),
  ( 'Escola', '#2F80ED'),
  ( 'Trabalho de Conclus�o', '#F2C94C'),
  ( 'Trabalho', '#EB5757'); 
 

SELECT * FROM public.categorias;


#Tarefas
 CREATE TABLE public.tarefas(
	id serial PRIMARY key not NULL,
	descricao VARCHAR ( 255 ) UNIQUE NOT NULL,
	data DATE NOT NULL DEFAULT CURRENT_DATE,
	realizado BOOL NOT NULL,
	categoria_id INT not null,
	FOREIGN KEY (categoria_id) REFERENCES categorias (id)
);


insert into tarefas (descricao, data, realizado, categoria_id) values 
  ('Pagar conta de energia', '2018-10-03 10:00:00', false, 1),
  ('Inciar o trabalho de ED', '2018-10-03 12:00:00', false, 2),
  ('Abastecer o carro', '2018-10-04 00:00:00', true, 1),
  ('Pagar conta de �gua', '2018-11-12 10:00:00', true, 1),
  ('Entregar trabalho de ED', '2018-11-14 19:00:00', false, 2),
  ('Entregar trabalho de Meio Ambiente', '2018-11-15 19:00:00', false, 2),
  ('Verificar folha de ponto', '2018-12-13 19:00:00', false, 4),
  ('Entregar cap�tulo introducao', '2018-11-28 19:00:00', false, 3);
  
 select * from public.tarefas;


update public.tarefas set descricao = 'Seminario Prof�tico 2', data = '2018-10-03T15:00:00.000Z', realizado = true, categoria_id =2  where id = 16;


#Artigos
CREATE TABLE public.artigos(
	id serial PRIMARY key not null,
	LinkImagem VARCHAR ( 1500 ) NOT NULL,
	titulo VARCHAR ( 100 ) NOT NULL,
	descricao VARCHAR ( 1000 ) NOT null,
	linkArtigo VARCHAR ( 1500 ) NOT null
);


insert into artigos (LinkImagem,titulo,descricao, linkArtigo) values
('https://estiloadoracao.com/wp-content/uploads/2018/03/Le%C3%A3o-da-tribo-de-Jud%C3%A1.jpg', 'Leão Da Tribo de Judá','Jesus é o Leão de Judá, mas por quê? Ele é chamado o leão da tribo de Judá porque ele é o rei e sua família era da tribo de Judá. Deus tinha prometido que o salvador viria de Judá. O leão representa a força e o poder.','https://www.editoracoffea.com.br/post/conquista-da-cidade-e-ora%C3%A7%C3%A3o')
  
select * from public.artigos;
