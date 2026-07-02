import {memo, useMemo} from 'react'
import type {ReadArticle} from '@/modules/construction-work/slice'
import type {ProjectsListItem} from '@/modules/construction-work/types/project'
import type {LogProps} from '@/processes/piwik/types'
import {getAccessibleDistanceText} from '@/modules/construction-work/components/projects/utils/getAccessibleDistanceText'
import {getAccessibleFollowingText} from '@/modules/construction-work/components/projects/utils/getAccessibleFollowingText'
import {ProjectCard} from '@/modules/construction-work/components/shared/ProjectCard'
import {ProjectTraits} from '@/modules/construction-work/components/shared/ProjectTraits'
import {getUnreadArticlesLength} from '@/modules/construction-work/utils/getUnreadArticlesLength'

type ListItemProps = {
  onPress: (id: number, isDummyItem?: boolean) => void
  project: ProjectsListItem
  readArticles: ReadArticle[]
  showTraits: boolean
} & LogProps

export const Project = memo(
  ({
    onPress,
    project,
    readArticles,
    showTraits,
    ...logProps
  }: ListItemProps) => {
    const {followed, meter, recent_articles} = project

    const [additionalAccessibilityLabel, unreadArticlesLength] = useMemo(() => {
      if (!showTraits) {
        return []
      }

      const unreadLength = getUnreadArticlesLength(
        readArticles,
        recent_articles,
      )

      return [
        `${getAccessibleFollowingText(!!followed, unreadLength ?? 0)}, ${getAccessibleDistanceText(meter)}`,
        unreadLength,
      ]
    }, [followed, meter, readArticles, recent_articles, showTraits])

    const {id, image, isDummyItem, subtitle, title} = project

    return (
      <ProjectCard
        additionalAccessibilityLabel={additionalAccessibilityLabel}
        imageSource={image?.sources}
        isDummyItem={isDummyItem}
        onPress={() => onPress(id, isDummyItem)}
        subtitle={subtitle}
        testID={`ConstructionWork${id}ProjectCard`}
        title={title}
        {...logProps}>
        {showTraits ? (
          <ProjectTraits
            accessibilityLabel={additionalAccessibilityLabel}
            project={project}
            unreadArticlesLength={unreadArticlesLength}
          />
        ) : undefined}
      </ProjectCard>
    )
  },
)
