/**
 * 数据持久存储
 */
interface Datasets {
	[route: string]: Dataset
}

interface Dataset {
	[index: string]: {
		clusterd: boolean,
		data: {
			[value: string]: any[]
		}
	}
}

/**
 * 键值对缓存
 */
interface Redis {
	[route: string]: Cache
}

interface Cache {
	created: number
	lifetime: number
	data: {
		[key: string]: any
	}
}

// 索引配置
interface IndexConfig {
	clustered: boolean
	// 哪个属性建索引
	indexName: string
}
