INSERT INTO language (name) VALUES ('polish');
INSERT INTO language (name) VALUES ('english');

INSERT INTO position (name) VALUES ('junior java developer');

INSERT INTO "user" (first_name, last_name, email, password) VALUES ('Jan', 'Nowak', 'jan.nowak@to.co', '12345678');

INSERT INTO test (owner_id, position_id) VALUES (1, 1);

INSERT INTO test_version (test_id, language_id, test) VALUES (1, 1,
'{"name":"Test 1","openQuestions":[{"question":"Ile masz lat?"},{"question":"Jak bardzo lubisz MASI?"}],"choiceQuestions":[{"question":"Ile masz lat?","answers":["8 lat","9 lat","10 lat"]},{"question":"Jak bardzo lubisz MASI?","answers":["8 lat","9 lat","10 lat"]}],"scaleQuestions":[{"question":"Jak bardzo lubisz MASI?","answers":[1,2,3]},{"question":"Jak bardzo lubisz Springa?","answers":[1,2,3,4,5,6]}],"numericQuestions":[{"question":"Ile masz lat?"},{"question":"8+3?"}]}'
);