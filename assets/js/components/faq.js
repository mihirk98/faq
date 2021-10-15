class FAQ extends HTMLElement {
  connectedCallback() {
    const title = this.attributes.title.value;
    const content = this.attributes.content.value;
    const index = this.attributes.index.value;
    this.innerHTML = `
    <div class="faq">
        <hr class="content-faq-hr">
        <div class="faq-title" onclick="faqTitleClick(${index})">
            <h3 class="faq-title-h3">${title}</h3>
            <div class="faq-expand">
              <span class="faq-expand-vertical"></span>
              <span class="faq-expand-horizontal"></span>
            </div>
        </div>
        <p id="faq-content-${index}" class="faq-content">${content}</p>
    </div>
    `;
  }
}

customElements.define("faq-component", FAQ);
