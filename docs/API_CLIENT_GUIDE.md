# API Client Guide

## Uso do `apiClient`

### GET

```ts
const res = await apiClient.get<User>("/api/users");
if (res.ok) console.log(res.data);
```

### POST

```ts
const res = await apiClient.post<User>("/api/users", { name: "Felipe" });
if (!res.ok) console.error(res.message);
```

### PUT

```ts
const res = await apiClient.put<User>("/api/users/1", { name: "Novo Nome" });
if (!res.ok) console.error(res.message);
```

### DELETE

```ts
const res = await apiClient.delete("/api/users/1");
if (!res.ok) console.error(res.message);
```
