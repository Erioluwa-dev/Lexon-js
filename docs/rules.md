# Validation Rules

## min(length)

Validates that a string meets a minimum length requirement.

```typescript
string().min(5).compile().validate("hello"); // true
string().min(5).compile().validate("hi"); // false
string().min(0).compile().validate(""); // true
```

### Error Message

```
String length {actual} is less than minimum {expected}
```

---

## max(length)

Validates that a string does not exceed a maximum length.

```typescript
string().max(5).compile().validate("hello"); // true
string().max(5).compile().validate("helloworld"); // false
string().max(5).compile().validate(""); // true
```

### Error Message

```
String length {actual} exceeds maximum {expected}
```

---

## charset(pattern, description)

Restricts characters to a regex character class pattern.

```typescript
// Alphanumeric usernames
string().charset("a-zA-Z0-9_", "alphanumeric").compile().validate("user_123"); // true

// UUID format
string().charset("a-fA-F0-9-", "UUID").compile().validate("550e8400-e29b-41d4-a716"); // true
```

The pattern is wrapped in character class brackets `[...]` and matched against the entire string.

### Error Message

```
String contains characters outside {description}
```

---

## noSpaces(strict?)

Disallows whitespace characters including space, tab, newline, and carriage return.

```typescript
string().noSpaces().compile().validate("helloworld"); // true
string().noSpaces().compile().validate("hello world"); // false
string().noSpaces().compile().validate("hello\tworld"); // false
```

### strict option

When `strict` is `false`, the rule always passes:

```typescript
string().noSpaces(false).compile().validate("hello world"); // true
```

---

## exact(length)

Validates that a string has an exact length requirement.

```typescript
string().exact(5).compile().validate("hello"); // true
string().exact(5).compile().validate("hi"); // false
string().exact(0).compile().validate(""); // true
string().exact(3).compile().validate("helloworld"); // false
```

### Error Message

```
String length {actual} does not equal exact length {expected}
```

---

## noWhitespace(strict?)

Disallows whitespace characters including space, tab, newline, and carriage return.

```typescript
string().noWhitespace().compile().validate("helloworld"); // true
string().noWhitespace().compile().validate("hello world"); // false
string().noWhitespace().compile().validate("hello\tworld"); // false
string().noWhitespace().compile().validate("hello\nworld"); // false
```

### strict option

When `strict` is `false`, only spaces are checked (tabs and newlines are allowed):

```typescript
string().noWhitespace(false).compile().validate("hello\tworld"); // true
string().noWhitespace(false).compile().validate("hello world"); // false
```

### Error Message

```
String contains whitespace
```

---

## startsWith(prefix)

Validates that a string starts with a specific prefix.

```typescript
string().startsWith("hello").compile().validate("hello world"); // true
string().startsWith("hello").compile().validate("helloworld"); // true
string().startsWith("hello").compile().validate("world hello"); // false
```

### Error Message

```
String does not start with "{prefix}"
```

---

## endsWith(suffix)

Validates that a string ends with a specific suffix.

```typescript
string().endsWith("world").compile().validate("hello world"); // true
string().endsWith("world").compile().validate("world"); // true
string().endsWith("world").compile().validate("world hello"); // false
```

### Error Message

```
String does not end with "{suffix}"
```

---

## contains(substring)

Validates that a string contains a specific substring.

```typescript
string().contains("hello").compile().validate("hello world"); // true
string().contains("hello").compile().validate("say hello"); // true
string().contains("hello").compile().validate("world"); // false
```

### Error Message

```
String does not contain "{substring}"
```

---

## notContains(substring)

Validates that a string does NOT contain a specific substring.

```typescript
string().notContains("hello").compile().validate("world"); // true
string().notContains("hello").compile().validate("goodbye"); // true
string().notContains("hello").compile().validate("hello world"); // false
```

### Error Message

```
String contains "{substring}"
```

---

## equals(value)

Validates that a string equals an exact value.

```typescript
string().equals("hello").compile().validate("hello"); // true
string().equals("hello").compile().validate("world"); // false
string().equals("hello").compile().validate("Hello"); // false
```

### Error Message

```
String "{actual}" does not equal "{expected}"
```

---

## regex(pattern, flags?)

Validates that a string matches a regular expression pattern. Use as an escape hatch for complex patterns not covered by other rules.

```typescript
// Email-like pattern
string().regex("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$").compile().validate("user@example.com"); // true

// With flags (e.g., case-insensitive)
string().regex("^test$", "i").compile().validate("TEST"); // true
```

### Error Message

```
String does not match pattern "{pattern}"
```

---

## Combining Rules

Multiple rules can be chained together:

```typescript
const schema = string()
  .min(3)
  .max(20)
  .startsWith("pre")
  .endsWith("suf")
  .contains("mid")
  .noWhitespace()
  .compile();
```

The rules are evaluated in order, and validation stops at the first failure.