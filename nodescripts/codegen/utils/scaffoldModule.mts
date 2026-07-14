import fs from 'node:fs/promises'
import path from 'node:path'
import ejs from 'ejs'
import type {CasingVariants} from '../generateModule.mts'

export const scaffoldModule = async (
  templateDir: string,
  outputDir: string,
  data: CasingVariants,
) => {
  await fs.mkdir(outputDir, {recursive: true})

  const entries = await fs.readdir(templateDir, {
    withFileTypes: true,
  })

  for (const entry of entries) {
    const templatePath = path.join(templateDir, entry.name)
    const outputPath = path.join(
      outputDir,
      processFileTemplateName(entry.name, data),
    )

    if (entry.isDirectory()) {
      await fs.mkdir(outputPath, {recursive: true})

      await scaffoldModule(templatePath, outputPath, data)
      continue
    }

    if (entry.name.endsWith('.ejs')) {
      const rendered = await ejs.renderFile(templatePath, data)

      console.table({
        entryName: entry.name,
        formattedName: processFileTemplateName(entry.name, data),
        outputPath,
        templatePath,
      })

      await fs.writeFile(outputPath, rendered)
    } else {
      // Copy non-template files unchanged
      await fs.copyFile(templatePath, outputPath)
    }
  }
}

const processFileTemplateName = (fileName: string, casing: CasingVariants) =>
  fileName
    .replace('__SCREEN__', `${casing.moduleSlugPascalCase}Index`)
    .replace(/\.ejs$/, '')
