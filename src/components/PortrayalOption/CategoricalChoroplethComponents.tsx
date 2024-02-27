// Imports from solid-js
import { createMemo, JSX, Show } from 'solid-js';

// Import from other libraries
import { FaSolidArrowRight } from 'solid-icons/fa';
import { BsThreeDotsVertical } from 'solid-icons/bs';
import * as Plot from '@observablehq/plot';
import Sortable from 'solid-sortablejs';

// Helpers
import { useI18nContext } from '../../i18n/i18n-solid';

// Types / Interfaces / Enums
import { type CategoricalChoroplethMapping } from '../../global.d';

export function CategoriesSummary(props: { mapping: CategoricalChoroplethMapping[] }): JSX.Element {
  const { LL } = useI18nContext();
  const hasNull = createMemo(() => props.mapping.some((m) => m[0] === null));
  const nCategories = createMemo(() => props.mapping.length - (hasNull() ? 1 : 0));
  return <div style={{ 'margin-top': '-1em', 'margin-bottom': '1em' }}>
    <div>
      <FaSolidArrowRight />&nbsp;
      <span>{ LL().PortrayalSection.CategoricalChoroplethOptions.Categories(nCategories()) }</span>
      <br />
      <FaSolidArrowRight/>&nbsp;
      <span>
        {
          hasNull()
            ? LL().PortrayalSection.CategoricalChoroplethOptions.HasNull()
            : LL().PortrayalSection.CategoricalChoroplethOptions.NoNull()
        }
      </span>
    </div>
  </div>;
}

export function CategoriesPlot(props: { mapping: CategoricalChoroplethMapping[] }): JSX.Element {
  const { LL } = useI18nContext();
  const domain = createMemo(() => props.mapping.map((m) => m.categoryName));
  const range = createMemo(() => props.mapping.map((m) => m.color));
  const data = createMemo(() => props.mapping.map((m, i) => ({
    position: i,
    category: m.categoryName,
    color: m.color,
    frequency: m.count,
  })));
  return <div>
    {
      Plot.plot({
        height: 200,
        color: {
          domain: domain(),
          range: range(),
          legend: true,
        },
        x: {
          type: 'band',
          tickFormat: null,
          ticks: 0,
          label: LL().PortrayalSection.CategoricalChoroplethOptions.XAxisCategories(),
        },
        y: {
          label: LL().PortrayalSection.CategoricalChoroplethOptions.YAxisCount(),
        },
        marks: [
          Plot.barY(
            data(),
            {
              x: 'category',
              y: 'frequency',
              fill: 'color',
              channels: {
                position: (d) => d.position,
              },
              sort: {
                y: 'position',
                order: 'ascending',
              },
            },
          ),
          Plot.ruleY([0]),
        ],
      })
    }
  </div>;
}

export function CategoriesCustomisation(
  props: {
    mapping: () => CategoricalChoroplethMapping[],
    setMapping: (m: CategoricalChoroplethMapping[]) => void,
    detailed?: boolean,
  },
): JSX.Element {
  const { LL } = useI18nContext();
  return <div>
    <Sortable
      items={props.mapping()}
      setItems={props.setMapping as any}
      idField={'value'}
    >
      {
        (item) => <div>
          <div
            style={{ width: '100%', border: 'solid 0.5px currentColor' }}
          >
            <BsThreeDotsVertical />
            <input
              type="color"
              style={{ height: '2em', 'vertical-align': 'bottom' }}
              value={item.color}
              onChange={(e) => {
                props.setMapping(
                  props.mapping()
                    .map((m) => (m.value === item.value ? { ...m, color: e.target.value } : m)),
                );
              }}
            />
            <input
              type="text"
              style={{ height: '2em', width: '400px' }}
              value={item.categoryName || ''}
              onChange={(e) => {
                props.setMapping(
                  props.mapping()
                    .map((m) => (
                      m.value === item.value ? { ...m, categoryName: e.target.value } : m)),
                );
              }}
            />
            <Show when={props.detailed}>
              <span>
                &nbsp;({ LL().PortrayalSection.CategoricalChoroplethOptions.Value() }
                &nbsp;{item.value} -
                &nbsp;{ LL().PortrayalSection.CategoricalChoroplethOptions.Count() }
                &nbsp;{item.count})
              </span>
            </Show>
          </div>
        </div>
      }
    </Sortable>
  </div>;
}
