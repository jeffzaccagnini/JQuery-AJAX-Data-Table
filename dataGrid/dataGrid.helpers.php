<?php 

function getLimit($page, $ipp) 
{
	$low = ($page-1)*$ipp;
	$limit = $low.','.$ipp;
	return $limit;
}