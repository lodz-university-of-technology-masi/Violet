package com.it.p.lodz.pl.masi.tasks;

import com.it.p.lodz.pl.masi.entities.LanguageEntity;
import com.it.p.lodz.pl.masi.entities.TestVersionEntity;
import com.it.p.lodz.pl.masi.exceptions.TestTranslationException;
import com.it.p.lodz.pl.masi.model.*;
import com.it.p.lodz.pl.masi.repositories.TestVersionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

public class TranslateTestTask implements Runnable {

    private static final Logger LOG = LoggerFactory.getLogger(TranslateTestTask.class);
    private LanguageEntity targetLanguageEntity;
    private TestVersionRepository testVersionRepository;
    private String googleTranslateApi;
    private TestVersionEntity sourceTestVersion;

    public TranslateTestTask(LanguageEntity targetLanguageEntity, TestVersionRepository testVersionRepository, String googleTranslateApi, TestVersionEntity sourceTestVersion) {
        this.targetLanguageEntity = targetLanguageEntity;
        this.testVersionRepository = testVersionRepository;
        this.googleTranslateApi = googleTranslateApi;
        this.sourceTestVersion = sourceTestVersion;
    }

    @Override
    public void run() {
        Test translatedTest = this.translateTest(this.sourceTestVersion.getLanguageByLanguageId().getCode(), this.targetLanguageEntity.getCode(), this.sourceTestVersion.getTest());

        TestVersionEntity translatedTestVersionEntity = new TestVersionEntity();
        translatedTestVersionEntity.setTest(translatedTest);
        translatedTestVersionEntity.setTestByTestId(this.sourceTestVersion.getTestByTestId());
        translatedTestVersionEntity.setLanguageByLanguageId(targetLanguageEntity);

        this.testVersionRepository.saveAndFlush(translatedTestVersionEntity);
        LOG.info("Test version id {} successfully translated.", this.sourceTestVersion.getId());
    }

    private Test translateTest(String langFrom, String langTo, Test test) {
        Test translatedTest = new Test();
        translatedTest.setName(this.translate(langFrom, langTo, test.getName()));

        List<OpenQuestion> translatedOpenQuestions = new ArrayList<>();
        List<ScaleQuestion> translatedScaleQuestions = new ArrayList<>();
        List<NumericQuestion> translatedNumericQuestions = new ArrayList<>();
        List<ChoiceQuestion> translatedChoiceQuestions = new ArrayList<>();

        for (int i = 0; i < test.getOpenQuestions().size(); i++) {
            OpenQuestion openQuestion = new OpenQuestion();
            openQuestion.setQuestion(this.translate(langFrom, langTo, test.getOpenQuestions().get(i).getQuestion()));
            translatedOpenQuestions.add(openQuestion);
        }

        for (int i = 0; i < test.getScaleQuestions().size(); i++) {
            ScaleQuestion scaleQuestion = new ScaleQuestion();
            scaleQuestion.setQuestion(this.translate(langFrom, langTo, test.getScaleQuestions().get(i).getQuestion()));
            scaleQuestion.setAnswers(test.getScaleQuestions().get(i).getAnswers());
            translatedScaleQuestions.add(scaleQuestion);
        }

        for (int i = 0; i < test.getNumericQuestions().size(); i++) {
            NumericQuestion numericQuestion = new NumericQuestion();
            numericQuestion.setQuestion(this.translate(langFrom, langTo, test.getNumericQuestions().get(i).getQuestion()));
            translatedNumericQuestions.add(numericQuestion);
        }

        for (int i = 0; i < test.getChoiceQuestions().size(); i++) {
            ChoiceQuestion choiceQuestion = new ChoiceQuestion();
            choiceQuestion.setQuestion(this.translate(langFrom, langTo, test.getChoiceQuestions().get(i).getQuestion()));
            List<String> translatedAnswers = new ArrayList<>();
            for(int j=0; j< test.getChoiceQuestions().get(i).getAnswers().size(); j++) {
                translatedAnswers.add(this.translate(langFrom, langTo, test.getChoiceQuestions().get(i).getAnswers().get(j)));
            }
            choiceQuestion.setAnswers(translatedAnswers);
            translatedChoiceQuestions.add(choiceQuestion);
        }

        translatedTest.setOpenQuestions(translatedOpenQuestions);
        translatedTest.setScaleQuestions(translatedScaleQuestions);
        translatedTest.setNumericQuestions(translatedNumericQuestions);
        translatedTest.setChoiceQuestions(translatedChoiceQuestions);

        return translatedTest;
    }

    private String translate(String langFrom, String langTo, String text) {
        String translateUrl = this.googleTranslateApi +
                "?q=" + URLEncoder.encode(text, StandardCharsets.UTF_8) +
                "&target=" + langTo +
                "&source=" + langFrom;
        try {
            URL url = new URL(translateUrl);
            StringBuilder response = new StringBuilder();
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestProperty("User-Agent", "Mozilla/5.0");
            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String inputLine;
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();
            return response.toString();
        } catch (IOException e) {
            throw new TestTranslationException();
        }
    }
}
