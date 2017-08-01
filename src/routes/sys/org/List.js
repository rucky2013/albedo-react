import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../../components/DataTable/AnimTableBody'
import { DropOption } from 'components'

const confirm = Modal.confirm

const List = ({ onDeleteItem, onLockItem, onEditItem, isMotion, location, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '你确定要操作这条记录吗?',
        onOk () {
          onLockItem(record.id)
        },
      })
    } else if (e.key === '3') {
      confirm({
        title: '你确定要删除这条记录吗?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '编码',
      dataIndex: 'code',
      key: 'code',
    }, {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    }, {
      title: '等级',
      dataIndex: 'grade',
      key: 'grade',
    }, {
      title: '序号',
      dataIndex: 'sort',
      key: 'sort',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    }, {
      title: '修改时间',
      dataIndex: 'lastModifiedDate',
      key: 'lastModifiedDate',
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '编辑' }, { key: '2', name: record.status =='正常' ? '锁定' : '解锁' }, { key: '3', name: '删除' }]} />
      },
    },
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    current: tableProps.pagination.current,
  }

  const getBodyWrapper = body => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
        bordered
        scroll={{ x: 1250 }}
        columns={columns}
        simple
        rowKey={record => record.id}
        getBodyWrapper={getBodyWrapper}
      />
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onLockItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
