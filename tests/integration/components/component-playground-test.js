import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('component-playground', 'Integration | Component | component playground', {
  integration: true
});

// Test #1 Basic Render Test
// ---------------------------------------------------------------------------
test('it renders', function(assert) {
  this.render(hbs`{{component-playground data-test='basic-render-test'}}`);

  assert.ok(this.$('[data-test="basic-render-test"]').length,
    'The containing context element renders');
  assert.ok(this.$('[data-test="basic-render-test-code"]').length,
    'The code editor element renders');
  assert.ok(this.$('[data-test="basic-render-test-preview"]').length,
    'The preview pane element renders');
});

// Test #2 Basic Render Test
// ---------------------------------------------------------------------------
test('it renders basic text input', function(assert) {
  this.render(hbs`
    {{component-playground
      code='Hi Mom'
      data-test='basic-text-input-test'}}
    `);

  assert.equal(this.$('[data-test="basic-text-input-test-code"]').text().trim(),
    'Hi Mom', 'The code editor element renders the passed-in text');
  assert.equal(this.$('[data-test="basic-text-input-test-preview"] .partial-wrapper').text().trim(), 'Hi Mom', 'The preview element renders the passed-in text');
});

// Test #3 Basic Code Render Test
// ---------------------------------------------------------------------------
test('valid code renders HTML in the preview pane', function(assert) {
  const codeString = '<button data-test="test-button">Test Button</button>';
  this.set('codeString', codeString);

  this.render(hbs`
    {{component-playground
      code=codeString
      data-test='html-render-test'}}
  `);

  assert.equal(this.$('[data-test="html-render-test-code"]').text().trim(),
    codeString, 'The code editor element renders the passed-in code');
  assert.ok(this.$('[data-test="html-render-test-preview"]')
    .find('[data-test="test-button"]').length,
    'The preview element renders real HTML');
});

// Test #4 Bad code triggers parse error without component death
// ---------------------------------------------------------------------------
test('bad code shows parse error without hard failure', function(assert) {
  const badCodeString = '<p data-test="test-para">Test Paragraph</h1>';
  const goodCodeString = '<p data-test="test-para">Test Paragraph</p>';
  this.set('codeString', badCodeString);

  this.render(hbs`
    {{component-playground
      code=codeString
      data-test='parse-error-test'}}
  `);

  assert.notEqual(this.$('[data-test="parse-error-test-preview-error-message"]')
    .text().trim(), '',
    'Bad code triggers display of a parser/compiler error in the preview pane');

  // Update the code string passed into the component to be something valid
  this.set('codeString', goodCodeString);

  assert.equal(this.$('[data-test="parse-error-test-preview-error-message"]')
    .text().trim(), '',
    'Parse error disappears when code is fixed');
    assert.ok(this.$('[data-test="parse-error-test-preview"]')
      .find('[data-test="test-para"]').length,
      'Preview element still renders compiled HTML after fixed error');
});
