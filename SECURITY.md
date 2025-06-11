# Security Guidelines for MazFlix

## 🔒 Environment Variables

This application uses environment variables to securely store sensitive information like API keys. **Never commit actual API keys to version control.**

### Setup Instructions

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Add your actual API key to the `.env` file:**
   ```
   VITE_TMDB_API_KEY=your_actual_api_key_here
   VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
   ```

3. **Get your TMDB API key:**
   - Visit [The Movie Database](https://www.themoviedb.org/settings/api)
   - Create an account and request an API key
   - Copy the API key to your `.env` file

## 🚫 What NOT to Do

- ❌ Never commit `.env` files to git
- ❌ Never hardcode API keys in source code
- ❌ Never share API keys in public repositories
- ❌ Never put secrets in client-side code that gets exposed

## ✅ Security Best Practices

- ✅ Use environment variables for all secrets
- ✅ Add `.env` to `.gitignore`
- ✅ Provide `.env.example` with placeholder values
- ✅ Validate environment variables at runtime
- ✅ Use different API keys for development/production

## 🔐 Additional Security Measures

1. **API Key Rotation**: Regularly rotate your API keys
2. **Rate Limiting**: Be aware of API rate limits
3. **Error Handling**: Don't expose sensitive information in error messages
4. **Dependencies**: Regularly update dependencies for security patches

## 🚨 If API Key is Compromised

If you accidentally commit an API key:

1. **Immediately revoke** the exposed API key
2. **Generate a new** API key
3. **Update your `.env`** file with the new key
4. **Consider rewriting git history** if the key was committed

## 📝 Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_TMDB_API_KEY` | The Movie Database API key | Yes |
| `VITE_TMDB_BASE_URL` | TMDB API base URL | No (has default) |

## 🔍 Security Checklist

Before deploying or committing:

- [ ] No hardcoded API keys in source code
- [ ] `.env` file is in `.gitignore`
- [ ] All secrets are in environment variables
- [ ] Error handling doesn't expose sensitive data
- [ ] Dependencies are up to date

---

**Remember**: Security is everyone's responsibility. When in doubt, ask for a security review! 