import {render} from '@testing-library/react-native'
import type {ComponentProps} from 'react'
import {BoatChargingSessionCostBreakdownItems} from '@/modules/boat-charging/components/BoatChargingSessionCostBreakDown'
import {boatChargingCostItemTypeMap} from '@/modules/boat-charging/constants/boatChargingCostItemTypeMap'
import {
  BoatChargingCostBreakdownItemType,
  type BoatChargingSessionCostBreakdownItem,
} from '@/modules/boat-charging/types'
import {StoreProvider} from '@/providers/store.provider'

const ITEMS: Record<
  BoatChargingCostBreakdownItemType,
  BoatChargingSessionCostBreakdownItem
> = {
  [BoatChargingCostBreakdownItemType.STANDARD_FINE]: {
    cost_incl_vat: 20,
    type: BoatChargingCostBreakdownItemType.STANDARD_FINE,
    unit_price: 10,
    volume: 2,
  },
  [BoatChargingCostBreakdownItemType.ENERGY]: {
    cost_incl_vat: 1.85,
    type: BoatChargingCostBreakdownItemType.ENERGY,
    unit_price: 0.5,
    volume: 3.7,
  },
  [BoatChargingCostBreakdownItemType.TIME]: {
    cost_incl_vat: 2.5,
    type: BoatChargingCostBreakdownItemType.TIME,
    unit_price: 1.25,
    volume: 2,
  },
  [BoatChargingCostBreakdownItemType.PARKING_TIME]: {
    cost_incl_vat: 0.75,
    type: BoatChargingCostBreakdownItemType.PARKING_TIME,
    unit_price: 0.75,
    volume: 1 / 60,
  },
  [BoatChargingCostBreakdownItemType.FLAT]: {
    cost_incl_vat: 1,
    type: BoatChargingCostBreakdownItemType.FLAT,
    unit_price: 0,
    volume: 0,
  },
}

const ITEMS_ARRAY = Object.values(ITEMS)

const renderComponent = (
  props: ComponentProps<typeof BoatChargingSessionCostBreakdownItems>,
) =>
  render(
    <StoreProvider>
      <BoatChargingSessionCostBreakdownItems {...props} />
    </StoreProvider>,
  )

describe('BoatChargingSessionCostBreakdownItems', () => {
  it('maps each item type to the expected row props for typical values', () => {
    const {getAllByTestId, getByText} = renderComponent({items: ITEMS_ARRAY})

    const infoRows = getAllByTestId(
      `BoatChargingHistorySessionCostDetailsInfoRow`,
    )

    expect(infoRows).toHaveLength(5)

    ITEMS_ARRAY.forEach((item, index) => {
      expect(infoRows[index]).toContainElement(
        getByText(boatChargingCostItemTypeMap[item.type].label),
      )

      expect(infoRows[index]).toContainElement(
        getByText(boatChargingCostItemTypeMap[item.type].details(item)),
      )
    })
  })

  it('renders no rows for an empty items list', () => {
    renderComponent({items: []})
    const {queryAllByTestId} = renderComponent({items: []})

    const infoRows = queryAllByTestId(
      `BoatChargingHistorySessionCostDetailsInfoRow`,
    )

    expect(infoRows).toHaveLength(0)
  })

  it('only renders rows if they have costs', () => {
    const {queryAllByTestId} = renderComponent({
      items: ITEMS_ARRAY.map(item => ({...item, cost_incl_vat: 0})),
    })

    const infoRows = queryAllByTestId(
      `BoatChargingHistorySessionCostDetailsInfoRow`,
    )

    expect(infoRows).toHaveLength(0)
  })

  it('renders the appropriate rows when only some items have costs', () => {
    const items = [
      ITEMS.ENERGY,
      ITEMS.PARKING_TIME,
      {...ITEMS.TIME, cost_incl_vat: 0},
      {...ITEMS.FLAT, cost_incl_vat: 0},
    ]
    const {queryAllByTestId, queryByText} = renderComponent({items})

    const infoRows = queryAllByTestId(
      'BoatChargingHistorySessionCostDetailsInfoRow',
    )

    expect(infoRows).toHaveLength(2)

    void [
      BoatChargingCostBreakdownItemType.TIME,
      BoatChargingCostBreakdownItemType.FLAT,
    ].forEach(type => {
      expect(queryByText(boatChargingCostItemTypeMap[type].label)).toBeNull()

      expect(
        queryByText(
          boatChargingCostItemTypeMap[type].details(
            items.find(item => item.type === type)!,
          ),
        ),
      ).toBeNull()
    })

    void [
      BoatChargingCostBreakdownItemType.ENERGY,
      BoatChargingCostBreakdownItemType.PARKING_TIME,
    ].forEach(type => {
      expect(
        queryByText(boatChargingCostItemTypeMap[type].label),
      ).not.toBeNull()

      expect(
        queryByText(
          boatChargingCostItemTypeMap[type].details(
            items.find(item => item.type === type)!,
          ),
        ),
      ).not.toBeNull()
    })
  })
})
