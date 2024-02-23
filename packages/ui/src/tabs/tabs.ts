import $ from "jquery";

function createToken(): string {
  return Math.random().toString(36).substring(2);
}

export interface TabItem {
  label: string;
  content: JQuery<HTMLElement> | string;
}

export function Tabs(tabItems: Array<TabItem>) {
  let lastActiveTabPanel: JQuery<HTMLElement>;
  const token = createToken();
  const tabId = `tab-container-${token}`;
  const container = $('<div>').attr('id', tabId).addClass('tab-container mb-4');
  const tabList = $('<ul>').addClass(
    'flex flex-wrap -mb-px text-sm font-medium text-center border-b border-gray-200'
  );
  const items = tabItems.map(({ label }, index) =>
    $('<li>').append(
      $('<button>')
        .addClass(
          `inline-block p-4 rounded-t-lg border-b-2 ${
            index === 0 ? 'active-tab' : ''
          }`
        )
        .attr('data-tab-target', `#${token}-${index}`)
        .text(label)
    )
  );
  const tabContents = tabItems.map(({ content }, index) => {
    const panel = $('<div>')
      .attr('id', `${token}-${index}`)
      .addClass(`tab-panel ${index === 0 ? '' : 'hidden'}`);
    typeof content === 'string' ? panel.html(content) : panel.append(content);
    return panel;
  });
  lastActiveTabPanel = tabContents[0];
  tabList.append(items);
  container.append(tabList);
  container.append($('<div>').attr('id', '').append(tabContents));
  container.find('[data-tab-target]').on('click', (e) => {
    container.find('[data-tab-target]').removeClass('active-tab');
    const targetTabPanelId = $(e.target).attr('data-tab-target') || '';
    $(e.target).addClass('active-tab');
    lastActiveTabPanel.addClass('hidden');
    lastActiveTabPanel = $(targetTabPanelId).toggleClass('hidden');
  });
  return container;
}
