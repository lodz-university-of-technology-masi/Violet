INSERT INTO "role" (name) VALUES ('redactor');
INSERT INTO "role" (name) VALUES ('moderator');

INSERT INTO position (name) VALUES ('Junior Java Developer');
INSERT INTO position (name, is_active) VALUES ('Mid Java Developer', false);
INSERT INTO position (name) VALUES ('Senior Java Developer');
INSERT INTO position (name) VALUES ('Junior .NET Developer');
INSERT INTO position (name) VALUES ('Mid .NET Developer');
INSERT INTO position (name) VALUES ('Senior .NET Developer');

INSERT INTO language (name, code) VALUES ('polish', 'pl');
INSERT INTO language (name, code) VALUES ('english', 'en');

INSERT INTO candidate (first_name, last_name, email, language_id, position_id)
VALUES ('Grzegorz', 'Kowalski', 'grzegorz@kowalski.pl', 1, 2);
INSERT INTO candidate (first_name, last_name, email, language_id, position_id)
VALUES ('Janina', 'Biała', 'janina@biala.pl', 1, 6);
INSERT INTO candidate (first_name, last_name, email, language_id, position_id)
VALUES ('Marta', 'Nowak', 'marta@nowak.com', 2, 1);
INSERT INTO candidate (first_name, last_name, email, language_id, position_id)
VALUES ('Andrzej', 'Piątek', 'andrzej@piatek.com', 2, 1);
INSERT INTO candidate (first_name, last_name, email, language_id, position_id)
VALUES ('Krzysztof', 'Cegła', 'krzysztof@cegla.pl', 1, 3);

-- password = 12345678
INSERT INTO "user" (first_name, last_name, email, password) VALUES ('Jan', 'Nowak', 'jan.nowak@to.co', '$2a$10$Cgqg2ZQdeMOV0HcRMEp0VuJxQEyZ/Avsi486mJow9SqEqCY5iJ6bi');
INSERT INTO "user" (first_name, last_name, email, password) VALUES ('Marek', 'Mały', 'marek.maly@to.co', '$2a$10$Cgqg2ZQdeMOV0HcRMEp0VuJxQEyZ/Avsi486mJow9SqEqCY5iJ6bi');
INSERT INTO "user" (first_name, last_name, email, password) VALUES ('Zofia', 'Kuc', 'zofia.kuc@to.co', '$2a$10$Cgqg2ZQdeMOV0HcRMEp0VuJxQEyZ/Avsi486mJow9SqEqCY5iJ6bi');

INSERT INTO user_role (user_id, role_id) VALUES (1, 1);
INSERT INTO user_role (user_id, role_id) VALUES (1, 2);

INSERT INTO user_role (user_id, role_id) VALUES (2, 1);

INSERT INTO user_role (user_id, role_id) VALUES (3, 2);

INSERT INTO test (owner_id, position_id) VALUES (1, 1);

INSERT INTO test (owner_id, position_id) VALUES (2, 1);
INSERT INTO test (owner_id, position_id) VALUES (2, 4);

INSERT INTO test_version (test_id, language_id, test) VALUES (1, 1,
'{"name": "Test dla Junior Java Developer","openQuestions": [{"question": "Czym są modyfikatory dostępu?"},{"question": "Co to immutable objects?"},{"question": "Opisz zasady SOLID"}],"choiceQuestions": [{"question": "Co znaczy TDD?","answers": ["Test Driven Development","Test-Domain-Data","Triple Description Defining"]},{"question": "Które z wymienionych pojęć nie jest wzorcem programowania?","answers": ["Abstract factory","Builder","Road","Bridge"]}],"scaleQuestions": [{"question": "Jaka jest najnowsza wersja Java SE?","answers": [10,11,12,13]}],"numericQuestions": [{"question": "Ile wynosi x? var x = 11/3"}]}'
);
INSERT INTO test_version (test_id, language_id, test) VALUES (1, 2,
'{ "name": "Junior Java Developer test", "openQuestions": [ { "question": "What are access modifiers?" }, { "question": "What are immutable objects?" }, { "question": "Describe SOLID concepts" } ], "choiceQuestions": [ { "question": "What does TDD mean?", "answers": [ "Test Driven Development", "Test-Domain-Data", "Triple Description Defining" ] }, { "question": "Which one is not a software design pattern?", "answers": [ "Abstract factory", "Builder", "Road", "Bridge" ] } ], "scaleQuestions": [ { "question": "What Java SE version was released this year?", "answers": [ 10, 11, 12, 13 ] } ], "numericQuestions": [ { "question": "What is the value of x? var x = 11/3" } ]}'
 );
INSERT INTO test_version (test_id, language_id, test) VALUES (2, 1,
'{"name": "Test dla Junior Java Developer","openQuestions": [{"question": "Czym są modyfikatory dostępu?"},{"question": "Co to immutable objects?"},{"question": "Opisz zasady SOLID"}],"choiceQuestions": [{"question": "Co znaczy TDD?","answers": ["Test Driven Development","Test-Domain-Data","Triple Description Defining"]},{"question": "Które z wymienionych pojęć nie jest wzorcem programowania?","answers": ["Abstract factory","Builder","Road","Bridge"]}],"scaleQuestions": [{"question": "Jaka jest najnowsza wersja Java SE?","answers": [10,11,12,13]}],"numericQuestions": [{"question": "Ile wynosi x? var x = 11/3"}]}'
);
INSERT INTO test_version (test_id, language_id, test) VALUES (2, 2,
'{ "name": "Junior Java Developer test", "openQuestions": [ { "question": "What are access modifiers?" }, { "question": "What are immutable objects?" }, { "question": "Describe SOLID concepts" } ], "choiceQuestions": [ { "question": "What does TDD mean?", "answers": [ "Test Driven Development", "Test-Domain-Data", "Triple Description Defining" ] }, { "question": "Which one is not a software design pattern?", "answers": [ "Abstract factory", "Builder", "Road", "Bridge" ] } ], "scaleQuestions": [ { "question": "What Java SE version was released this year?", "answers": [ 10, 11, 12, 13 ] } ], "numericQuestions": [ { "question": "What is the value of x? var x = 11/3" } ]}'
 );
INSERT INTO test_version (test_id, language_id, test) VALUES (3, 1,
'{"name": "Test dla Junior .NET Developer","openQuestions": [{"question": "Czym są modyfikatory dostępu?"},{"question": "Co to immutable objects?"},{"question": "Opisz zasady SOLID"}],"choiceQuestions": [{"question": "Co znaczy TDD?","answers": ["Test Driven Development","Test-Domain-Data","Triple Description Defining"]},{"question": "Które z wymienionych pojęć nie jest wzorcem programowania?","answers": ["Abstract factory","Builder","Road","Bridge"]}],"scaleQuestions": [{"question": "Jaka wersja C# jest obecnie w preview?","answers": [2,3,8,9]}],"numericQuestions": [{"question": "Ile wynosi x? var x = 11/3"}]}'
);

INSERT INTO resolved_test (owner_id, candidate_id, position_id, language_id, test, answer, mark, points_sum, points_max)
VALUES (1, 3, 1, 1,
        '{"name": "Test dla Junior Java Developer","openQuestions": [{"question": "Czym są modyfikatory dostępu?"},{"question": "Co to immutable objects?"},{"question": "Opisz zasady SOLID"}],"choiceQuestions": [{"question": "Co znaczy TDD?","answers": ["Test Driven Development","Test-Domain-Data","Triple Description Defining"]},{"question": "Które z wymienionych pojęć nie jest wzorcem programowania?","answers": ["Abstract factory","Builder","Road","Bridge"]}],"scaleQuestions": [{"question": "Jaka jest najnowsza wersja Java SE?","answers": [10,11,12,13]}],"numericQuestions": [{"question": "Ile wynosi x? var x = 11/3"}]}',
        '{"testAnswers": ["nie wiem","takie które się nie zmieniają","takie zasady żeby dobrze programować","Test Driven Development","Road","13","3"]}',
        '{"marks":[0,1,0,1,1,0,1]}', 4, 7);
INSERT INTO resolved_test (owner_id, candidate_id, position_id, language_id, test, answer, mark, points_sum, points_max)
VALUES (2, 4, 1, 1,
        '{"name": "Test dla Junior Java Developer","openQuestions": [{"question": "Czym są modyfikatory dostępu?"},{"question": "Co to immutable objects?"},{"question": "Opisz zasady SOLID"}],"choiceQuestions": [{"question": "Co znaczy TDD?","answers": ["Test Driven Development","Test-Domain-Data","Triple Description Defining"]},{"question": "Które z wymienionych pojęć nie jest wzorcem programowania?","answers": ["Abstract factory","Builder","Road","Bridge"]}],"scaleQuestions": [{"question": "Jaka jest najnowsza wersja Java SE?","answers": [10,11,12,13]}],"numericQuestions": [{"question": "Ile wynosi x? var x = 11/3"}]}',
        '{"testAnswers": ["nie wiem","takie które się nie zmieniają","takie zasady żeby dobrze programować","Test Driven Development","Road","12","3"]}',
        '{"marks":[0,1,0,1,1,1,1]}', 5, 7);

INSERT INTO usability_data (ip, browser, username, m_id, savetime, res_w, res_h, mc, time, dist, fail, error)
VALUES ('127.0.0.1', 'F', 'candidate-127.0.0.1', 1, '2019-05-15 17:11', 1920, 1080, 1, 98.82, 20983, 0, 0);
INSERT INTO usability_data (ip, browser, username, m_id, savetime, res_w, res_h, mc, time, dist, fail, error)
VALUES ('192.168.1.213', 'C', 'jan.nowak@to.co', 1, '2019-05-15 17:13', 1920, 1080, 2, 182.09, 45738, 1, 3);