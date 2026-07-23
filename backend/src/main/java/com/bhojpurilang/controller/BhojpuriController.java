package com.bhojpurilang.controller;

import com.bhojpurilang.ast.Program;
import com.bhojpurilang.interpreter.Interpreter;
import com.bhojpurilang.lexer.Lexer;
import com.bhojpurilang.model.RunRequest;
import com.bhojpurilang.model.RunResponse;
import com.bhojpurilang.model.Token;
import com.bhojpurilang.parser.Parser;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class BhojpuriController {

    @PostMapping("/run")
    public ResponseEntity<RunResponse> runCode(@RequestBody RunRequest request) {
        if (request == null || request.getCode() == null || request.getCode().trim().isEmpty()) {
            return ResponseEntity.ok(new RunResponse(true, "", Collections.emptyList()));
        }

        try {
            // 1. Lexical Analysis
            Lexer lexer = new Lexer(request.getCode());
            List<Token> tokens = lexer.tokenize();

            // 2. Syntax Analysis
            Parser parser = new Parser(tokens);
            Program program = parser.parse();

            // 3. Interpretation
            Interpreter interpreter = new Interpreter();
            String output = interpreter.execute(program);

            return ResponseEntity.ok(new RunResponse(true, output, Collections.emptyList()));
        } catch (RuntimeException e) {
            return ResponseEntity.ok(new RunResponse(false, "", Collections.singletonList(e.getMessage())));
        } catch (Exception e) {
            return ResponseEntity.ok(new RunResponse(false, "", Collections.singletonList("Internal Error: " + e.getMessage())));
        }
    }
}
