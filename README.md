# **Uncorking Insights: Exploring Wine Reviews in California** 🍷📊  

## **Project Overview**  
This project was developed as part of our **Data Visualization** class to explore the vast world of wine reviews through interactive data storytelling. Using **D3.js** and **Tableau**, we created an interactive website to analyze **wine varieties, pricing trends, ratings, and winery distributions** - all centered around **California’s wine industry**.  

What makes this project even more unique is that neither of us drinks alcohol! That made our curiosity-driven approach even more fascinating. We sought to understand **how people perceive wine, what influences its price and ratings, and which wineries dominate California’s wine production**.  

## **Motivation & Inspiration**  
As international students from **Jordan and India**, we wanted to explore a topic that deeply resonates with American culture. With the holiday season approaching, we interviewed friends and discovered a common tradition: **gathering with family and enjoying wine**. This sparked our interest in analyzing wine reviews and trends in **California—the heart of U.S. wine production**.  

We were also inspired by industry-leading platforms like **Wine Advocate, Vivino, and Wine Spectator**, which showcase wine reviews and rankings. However, we wanted to take a more **data-driven** and **interactive** approach to visualize this information dynamically.  

## **Tech Stack & Tools**  
- **Frontend**: HTML, CSS, JavaScript  
- **Data Visualization**: **D3.js**, **Tableau**  
- **Dataset**: [Wine Enthusiast Reviews](https://www.kaggle.com/datasets/zynicide/wine-reviews) (sourced from Kaggle)  

## **Project Objectives & Key Questions**  
Through visual analytics, we aimed to explore:  

1. **Wine Varieties in California**  
   - What are the most common wine varieties in the state?  
   - **Visualization**: **Treemap** for category distribution.  

2. **Price vs. Rating Trends**  
   - Does a higher price guarantee a better wine rating?  
   - **Visualization**: **Scatterplot** to analyze price vs. points.  

3. **Winery Production**  
   - Which wineries produce the most wines?  
   - **Visualization**: **Packed Bubble Chart** for winery distribution.  

## **Data Processing**  
The dataset originally contained **129,971 records** and **14 attributes**. We cleaned and refined it to focus on **California wines**, reducing it to **16,475 records** with the following steps:  
✅ **Selected key attributes**: `Country`, `Province`, `Price`, `Points`, `Variety`, `Winery`  
✅ **Filtered records**: Focused only on wines from **California**  
✅ **Removed null values & duplicates**  
✅ **Excluded varieties with very few records**  

## **Exploratory Data Analysis (EDA)**  
Before diving into visualizations, we explored the dataset to understand its structure:  
- **Wine price range in California**: **$4 – $750**  
- **Average price**: **$40.94**  
- **Rating range**: **80 – 99 points**  

This helped us fine-tune our visualizations and insights.  

## **Visualizations & Interactivity**  
✨ **Treemap**: Displays the **distribution of wine varieties** in California. Users can see the most common varieties and filter the dataset.  
✨ **Scatterplot**: Analyzes the **relationship between price and rating** (points). Users can spot trends, outliers, and correlations.  
✨ **Packed Bubble Chart**: Represents the **distribution of wineries** and their wine production. Clicking a winery highlights its wines in the scatterplot.  

## **Design Evolution & Challenges**  
Our project went through **multiple iterations** based on feedback and class learnings:  
1. **Initial Design**:  
   - Included a **world map** (later removed due to excessive empty space).  
   - Used a **Sankey chart** for winery distribution (removed due to high cardinality).  

2. **Refined Design**:  
   - Replaced **Sankey chart** with a **bar chart** (later replaced again).  
   - Focused only on **California wines**, making data more relevant.  

3. **Final Design**:  
   - **Treemap** for wine varieties.  
   - **Scatterplot** for price vs. points.  
   - **Packed Bubble Chart** for wineries.  

## **Project Timeline**  
| Phase         | Timeline        | Tasks Completed |
|--------------|---------------|----------------|
| **Week 1**   | Oct 7 - Oct 13  | Data processing, website design, Tableau visualizations |
| **Week 2**   | Oct 14 - Oct 20 | Implementing D3.js visualizations |
| **Week 3**   | Oct 21 - Oct 27 | Enhancing UI, adding interactivity |
| **Week 4**   | Oct 28 - Nov 5  | Final touch-ups and optimizations |

