# Contributing to Qupon

First off, thank you for considering contributing to Qupon! It's people like you that make Qupon such a great tool for the Islamic community.

## 🌟 Ways to Contribute

### 🐛 Reporting Bugs
- Use the GitHub issue tracker to report bugs
- Describe the bug clearly with steps to reproduce
- Include screenshots or recordings if applicable
- Specify your browser and operating system

### 💡 Suggesting Enhancements
- Use GitHub issues to suggest new features
- Provide a clear description of the enhancement
- Explain why this enhancement would be useful
- Consider the scope and complexity of your suggestion

### 🔧 Code Contributions
- Fork the repository
- Create a new branch for your feature
- Follow the coding standards outlined below
- Write clear, concise commit messages
- Test your changes thoroughly
- Submit a pull request

## 🛠️ Development Process

### Setting Up Your Development Environment

1. **Fork and Clone**
   ```cmd
   git clone https://github.com/yourusername/qupon.git
   cd qupon
   ```

2. **Install Dependencies**
   ```cmd
   yarn install
   ```

3. **Start Development Server**
   ```cmd
   yarn dev
   ```

### Coding Standards

#### JavaScript
- Use ES6+ features
- Follow functional programming principles
- Use meaningful variable and function names
- Add comments for complex logic
- Prefer const over let, avoid var

#### React Components
- Use functional components with hooks
- Implement lazy loading for better performance
- Use minimal imports to reduce bundle size
- Follow React best practices

#### Material-UI
- Use Material-UI components consistently
- Follow the established theme patterns
- Implement responsive design
- Use proper accessibility features

#### File Structure
```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── utils/         # Utility functions
└── assets/        # Static assets
```

### Commit Message Format
```
type(scope): description

Examples:
feat(generator): add QR code customization options
fix(print): resolve PDF export issue on mobile
docs(readme): update installation instructions
style(layout): improve responsive design
```

## 🧪 Testing

- Test your changes across different browsers
- Verify responsive design on various screen sizes
- Test print functionality
- Check PDF export quality
- Validate QR code generation

## 📝 Pull Request Process

1. **Update Documentation**
   - Update README.md if needed
   - Add comments to complex code
   - Update CHANGELOG.md

2. **Create Pull Request**
   - Use a clear title and description
   - Reference related issues
   - Include screenshots for UI changes
   - List breaking changes if any

3. **Review Process**
   - Address reviewer feedback promptly
   - Make requested changes
   - Maintain code quality standards

## 🎯 Feature Requests

When suggesting new features, consider:

- **Community Benefit**: Will this help the Islamic community?
- **Maintainability**: Is the code easy to maintain?
- **Performance**: Does it impact app performance?
- **Accessibility**: Is it accessible to all users?
- **Mobile Compatibility**: Does it work on mobile devices?

## 🔒 Security

If you discover a security vulnerability, please send an email to security@qupon.app instead of using the issue tracker.

## 📖 Documentation

- Keep documentation up to date
- Use clear, concise language
- Include examples where helpful
- Consider non-native English speakers

## 🤝 Community Guidelines

- Be respectful and inclusive
- Help newcomers get started
- Share knowledge and best practices
- Focus on constructive feedback
- Celebrate contributions from others

## 🏷️ Issue Labels

- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Improvements to documentation
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention is needed
- `priority-high`: Critical issues
- `priority-medium`: Important issues
- `priority-low`: Nice to have

## 📞 Getting Help

- Check existing issues and discussions
- Read the documentation thoroughly
- Ask questions in GitHub discussions
- Be specific about your problem
- Provide relevant context and examples

## 🎉 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Special acknowledgments for major features

## 📄 License

By contributing to Qupon, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Qupon! Together, we can make it an even better tool for the Islamic community. 🌟
