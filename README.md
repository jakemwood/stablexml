StableXML
========

[![Build Status](https://travis-ci.org/yakkob/stablexml.png?branch=master)](https://travis-ci.org/yakkob/stablexml) | [Test Coverage Report](http://htmlpreview.github.com/?https://github.com/yakkob/stablexml/blob/master/test_coverage.html)

## Authors
This library was written by Jake Wood and James Steinberg for a Software Development (CS 6515) class at Northeastern University.

## Summary

This Node.js module parses an XML string, but also maintains the order of the nodes.  It uses a data format loosely based on xml2js, and uses SAX for the actual XML parsing.

**Warning:** this library was written specifically for an academic class.  It does not support all features of XML, as these particular features were not needed for the class.  For example, the following XML will parse, but data will be lost:

	<test>1234</test>

In this example, the "1234" will be lost.

Development on this library might continue to support all of XML.  We shall see.  Feel free to fork and submit merge requests if you want to add this functionality.

## Example
Suppose you are given the following XML input:

    <foo>
        <bar baz="abc" />
        <bar abc="123" />
    </foo>
    
This will create a JavaScript object that looks like this:

    [
    	{
    		foo:
    		{
	            _: [
	            {
	            	bar:
	            	{
		            	$: {
		            		baz: "abc"
		            	}
	            },
	            {
	            	bar:
	            	{
	            		$: {
	            			abc: "123"
	            		}
	            	}
	            }
	            ]
	        }
	    }
	]
	
Obviously, these objects are very large/deep.  We're very sorry about that, but it was the best way we could write the XML parser (quickly) to be sensitive to the ordering of the XML nodes.

Another example:

	<state>
		<board>
			<tile row="A" column="1" />
		</board>
	</state>
	
This will produce:

	[
		{
			state:
			{
				_:
				[
					{
						board:
						{
							_:
							[
								{
									tile:
									{
										$:
										{
											row: "A",
											column: "1"
										}
									}
								}
							]
						}
					}
				]
			}
		}
	]
	
These two examples lead to a common pattern, explained below using our data types.

## Data Types

### Node
A node is represented by:

	{
		foo:
		{
			$: Attributes
			_: Array[Node]
		}
	}
	
Where "foo" can be any arbitrary XML tag name.

## Attributes
Attributes is either undefined _or_ an associative JavaScript object containing the keys and values of the attributes of a true XML node.

## Questions?
Feel free to open an issue on GitHub if you spot any issues or have questions.