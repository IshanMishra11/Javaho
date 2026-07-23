package com.bhojpurilang.interpreter;

import java.util.HashMap;
import java.util.Map;

public class Environment {
    private final Map<String, Object> values = new HashMap<>();

    public void define(String name, Object value) {
        values.put(name, value);
    }

    public void assign(String name, Object value, int line) {
        if (values.containsKey(name)) {
            values.put(name, value);
            return;
        }
        throw new RuntimeException("Runtime Error at line " + line + ": Unknown variable '" + name + "'");
    }

    public Object get(String name, int line) {
        if (values.containsKey(name)) {
            return values.get(name);
        }
        throw new RuntimeException("Runtime Error at line " + line + ": Unknown variable '" + name + "'");
    }
}
