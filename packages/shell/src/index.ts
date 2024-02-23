import $ from "jquery";
import { Tabs, TabItem } from '@jquery-monorepo/ui';
import { About } from '@jquery-monorepo/about';
import { Products } from '@jquery-monorepo/products';

const tabItems: TabItem[] = [
  {
    label: 'About',
    content: About(),
  },
  {
    label: 'Products',
    content: Products(),
  },
];

$(() => {
  $('#tabs').append(Tabs(tabItems));
});
