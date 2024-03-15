const newsTemplate = `
{{#each news}}
    <div class="news-row">
        <div id="{{id}}" class="news-item">
            <div class="news-content">
                <p class="news-title">
                    {{title}}
                </p>
                <p class="news-text">
                    {{content}}
                </p>
            </div>
        </div>
    </div>
{{/each}}
`;
