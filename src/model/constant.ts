
const calculate = (key: string) => {
  const config = {
    amazon: {
      search: [
        {
          label: 'Cookie',
          key: 'cookie',
          placeholder: 'Please input cookie',
          type: 'textarea'
        },
        {
          label: 'Url',
          key: 'url',
          placeholder: 'Please input url',
          type: 'input'
        },
        {
          label: 'Keyword',
          key: 'keyword',
          placeholder: 'Please input keyword',
          type: 'input'
        }
      ],
      list: [
        {
          dataIndex: 'image',
          title: 'Image',
          width: 100,
          cell: 'renderCellImage'
        },
        {
          dataIndex: 'asin',
          title: 'Asin',
          width: 120
        },
        {
          dataIndex: 'title',
          title: 'Title',
        },
        {
          dataIndex: 'review',
          title: 'Review',
          width: 100
        },
        {
          dataIndex: 'price',
          title: 'Price',
          width: 100
        },
        {
          dataIndex: 'shipping',
          title: 'Shipping Cost',
          width: 120
        }
      ]
    },
    giga: {
      search: [
        {
          label: 'Cookie',
          key: 'cookie',
          placeholder: 'Please input cookie',
          type: 'textarea'
        },
        {
          label: 'Url',
          key: 'url',
          placeholder: 'Please input url',
          type: 'input'
        }
      ],
      list: [
        {
          dataIndex: 'image',
          title: 'Image',
          width: 200,
          cell: 'renderCellImage'
        },
        {
          dataIndex: 'title',
          title: 'Title',
        },
        {
          dataIndex: 'price',
          title: 'Price',
          width: 200
        },
        {
          dataIndex: 'qty',
          title: 'Qty',
          width: 200
        }
      ]
    }
  }

  // @ts-ignore
  return config[key]
}

export default calculate