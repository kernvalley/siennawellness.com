import '@shgysk8zer0/kazoo/theme-cookie.js';
import { getGooglePolicy } from '@shgysk8zer0/kazoo/trust-policies.js';
import { ready, toggleClass, css, on, map, removeClass } from '@shgysk8zer0/kazoo/dom.js';
import { createOption } from '@shgysk8zer0/kazoo/elements.js';
import { debounce } from '@shgysk8zer0/kazoo/events.js';
import { init } from '@shgysk8zer0/kazoo/data-handlers.js';
import { importGa, externalHandler, telHandler, mailtoHandler } from '@shgysk8zer0/kazoo/google-analytics.js';
import { GA } from './consts.js';
import './components.js';

if (! CSS.supports('height', '1dvh')) {
	css([document.documentElement], { '--viewport-height': `${window.innerHeight}px`});

	requestIdleCallback(() => {
		on([window], {
			resize: debounce(() => css([document.documentElement], { '--viewport-height': `${window.innerHeight}px`})),
			scroll: () => {
				requestAnimationFrame(() => {
					css('#header', { 'background-position-y': `${-0.5 * scrollY}px` });
				});
			}
		}, { passive: true });
	});
}

toggleClass([document.documentElement], {
	'no-dialog': document.createElement('dialog') instanceof HTMLUnknownElement,
	'no-details': document.createElement('details') instanceof HTMLUnknownElement,
	'js': true,
	'no-js': false,
});

if (typeof GA === 'string' && GA.length !== 0) {
	scheduler.postTask(() => {
		importGa(GA, {}, { policy: getGooglePolicy() }).then(async ({ ga, hasGa }) => {
			if (hasGa()) {
				ga('create', GA, 'auto');
				ga('set', 'transport', 'beacon');
				ga('send', 'pageview');

				on('a[rel~="external"]', ['click'], externalHandler, { passive: true, capture: true });
				on('a[href^="tel:"]', ['click'], telHandler, { passive: true, capture: true });
				on('a[href^="mailto:"]', ['click'], mailtoHandler, { passive: true, capture: true });
			}
		});
	}, { priority: 'background' });
}

Promise.all([
	ready(),
]).then(() => {
	init();

	if (location.pathname === '/insurance/') {
		on('#insurance-query', 'input', debounce(({ target }) => {
			const items = map(
				`#${target.value.at(0).toUpperCase()} .insurance-provider`,
				el => ({ label: el.textContent.trim(), value: el.textContent.trim() })
			);

			document.getElementById(target.getAttribute('list'))
				.replaceChildren(... items.map(createOption));
		}));

		on('#insurance-search', 'submit', event => {
			event.preventDefault();
			const data = new FormData(event.target);
			const target = document.querySelector(`[data-provider="${data.get('query')}"]`);

			if (target instanceof HTMLElement) {
				removeClass('.insurance-provider.marked', 'marked');
				location.hash = `#${target.id}`;
				target.classList.add('marked');
			}
		});
	}
});
