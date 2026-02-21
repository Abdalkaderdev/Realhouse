<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  exclude-result-prefixes="s image">

  <xsl:output method="html" indent="yes" encoding="UTF-8"/>

  <xsl:template match="/">
    <html>
      <head>
        <title>XML Sitemap - Real House Erbil</title>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 14px;
            color: #333;
            background: #f5f5f5;
            line-height: 1.6;
          }
          .header {
            background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%);
            color: #fff;
            padding: 40px 20px;
            text-align: center;
            border-bottom: 4px solid #c9a84c;
          }
          .header h1 {
            font-size: 28px;
            font-weight: 600;
            margin-bottom: 10px;
            color: #c9a84c;
          }
          .header p { color: #aaa; font-size: 14px; }
          .header a { color: #c9a84c; text-decoration: none; }
          .header a:hover { text-decoration: underline; }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 30px 20px;
          }
          .stats {
            display: flex;
            gap: 20px;
            margin-bottom: 30px;
            flex-wrap: wrap;
          }
          .stat-card {
            background: #fff;
            padding: 20px 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.08);
            flex: 1;
            min-width: 150px;
            text-align: center;
          }
          .stat-card .number {
            font-size: 32px;
            font-weight: 700;
            color: #c9a84c;
          }
          .stat-card .label {
            color: #666;
            font-size: 13px;
            margin-top: 5px;
          }
          .section {
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.08);
            margin-bottom: 20px;
            overflow: hidden;
          }
          .section-header {
            background: #fafafa;
            padding: 15px 20px;
            border-bottom: 1px solid #eee;
            font-weight: 600;
            color: #333;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .section-header .count {
            background: #c9a84c;
            color: #fff;
            padding: 3px 10px;
            border-radius: 20px;
            font-size: 12px;
          }
          table { width: 100%; border-collapse: collapse; }
          th {
            background: #f9f9f9;
            padding: 12px 15px;
            text-align: left;
            font-weight: 600;
            color: #555;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 2px solid #eee;
          }
          td {
            padding: 12px 15px;
            border-bottom: 1px solid #f0f0f0;
            vertical-align: top;
          }
          tr:hover { background: #fafafa; }
          .url-cell { max-width: 400px; }
          .url-cell a {
            color: #1a73e8;
            text-decoration: none;
            word-break: break-all;
          }
          .url-cell a:hover { text-decoration: underline; }
          .priority {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;
          }
          .priority-high { background: #e8f5e9; color: #2e7d32; }
          .priority-medium { background: #fff3e0; color: #ef6c00; }
          .priority-low { background: #f5f5f5; color: #757575; }
          .freq { color: #666; font-size: 13px; }
          .date { color: #888; font-size: 13px; }
          .image-count {
            background: #e3f2fd;
            color: #1565c0;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 11px;
          }
          .footer {
            text-align: center;
            padding: 30px;
            color: #888;
            font-size: 13px;
          }
          .footer a { color: #c9a84c; text-decoration: none; }
          @media (max-width: 768px) {
            .stats { flex-direction: column; }
            .url-cell { max-width: 200px; }
            th, td { padding: 10px; font-size: 12px; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🏠 Real House XML Sitemap</h1>
          <p>This sitemap contains <strong><xsl:value-of select="count(s:urlset/s:url)"/></strong> URLs for <a href="https://realhouseiq.com">realhouseiq.com</a></p>
        </div>

        <div class="container">
          <div class="stats">
            <div class="stat-card">
              <div class="number"><xsl:value-of select="count(s:urlset/s:url)"/></div>
              <div class="label">Total URLs</div>
            </div>
            <div class="stat-card">
              <div class="number"><xsl:value-of select="count(s:urlset/s:url[image:image])"/></div>
              <div class="label">With Images</div>
            </div>
            <div class="stat-card">
              <div class="number"><xsl:value-of select="count(s:urlset/s:url[s:priority >= 0.8])"/></div>
              <div class="label">High Priority</div>
            </div>
          </div>

          <div class="section">
            <div class="section-header">
              <span>📄 All URLs</span>
              <span class="count"><xsl:value-of select="count(s:urlset/s:url)"/> pages</span>
            </div>
            <table>
              <thead>
                <tr>
                  <th>URL</th>
                  <th>Priority</th>
                  <th>Change Freq</th>
                  <th>Last Modified</th>
                  <th>Images</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="s:urlset/s:url">
                  <xsl:sort select="s:priority" order="descending" data-type="number"/>
                  <tr>
                    <td class="url-cell">
                      <a href="{s:loc}">
                        <xsl:choose>
                          <xsl:when test="s:loc = 'https://realhouseiq.com'">
                            <xsl:text>/</xsl:text>
                          </xsl:when>
                          <xsl:otherwise>
                            <xsl:value-of select="substring-after(s:loc, 'https://realhouseiq.com')"/>
                          </xsl:otherwise>
                        </xsl:choose>
                      </a>
                    </td>
                    <td>
                      <xsl:choose>
                        <xsl:when test="s:priority >= 0.8">
                          <span class="priority priority-high"><xsl:value-of select="s:priority"/></span>
                        </xsl:when>
                        <xsl:when test="s:priority >= 0.6">
                          <span class="priority priority-medium"><xsl:value-of select="s:priority"/></span>
                        </xsl:when>
                        <xsl:otherwise>
                          <span class="priority priority-low"><xsl:value-of select="s:priority"/></span>
                        </xsl:otherwise>
                      </xsl:choose>
                    </td>
                    <td class="freq"><xsl:value-of select="s:changefreq"/></td>
                    <td class="date"><xsl:value-of select="s:lastmod"/></td>
                    <td>
                      <xsl:if test="image:image">
                        <span class="image-count"><xsl:value-of select="count(image:image)"/> img</span>
                      </xsl:if>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>
        </div>

        <div class="footer">
          <p>Generated by <a href="https://realhouseiq.com">Real House</a> • Luxury Real Estate in Erbil, Kurdistan</p>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
