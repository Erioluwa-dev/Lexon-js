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